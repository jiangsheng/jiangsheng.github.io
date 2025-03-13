AutoComplete with DataSource
=============================

Download Sample code: https://github.com/jiangsheng/Samples/tree/master/AutoComplete

.Net 2.0 introduced autocompletion in TextBox and ComboBox. It is obvious that autocomplete is not very useful when the number of options is small. However, when the number of option becomes too many, pre-filling of all options to an AutoCompleteStringCollection becomes impractical, especially when the data is coming from a remote computer. An alternative is to replace the AutoCompleteCustomSource in a TextChanged event, however, users are getting random AccessViolationException when trying to replace it.  In this article I will demonstrate another alternative, using a BindingSource as the data source of options, bypassing the .Net framework and call the underline Windows API directly.

The first thing I need to do is to port the Windows autocomplete APIs to managed code. The autocompletion API is exposed as a COM object, so I need to write managed version of its interfaces:
.. code-block:: C++

    [ComImport]
    [InterfaceType(ComInterfaceType::InterfaceIsIUnknown)]
    [Guid("EAC04BC0-3791-11D2-BB95-0060977B464C")]
    [SuppressUnmanagedCodeSecurity]
    interface  class IAutoComplete2
    {
    [PreserveSig] int Init(
    HandleRef hwndEdit,
    IEnumString^ punkACL,
    String^ pwszRegKeyPath,
    String^ pwszQuickComplete
    );
    void Enable( [MarshalAs(UnmanagedType::Bool)] bool value);

    int SetOptions(int dwFlag);

    void GetOptions([Out]IntPtr pdwFlag);
    };

Second, I need to create the autocomplete object and query the IAutoComplete2 interface in order to change its options:
.. code-block:: C++

    Type^ autoCompleteType = Type::GetTypeFromCLSID(CLSID_AutoComplete);
    try{
    autoComplete2 =(IAutoComplete2^)(Activator::CreateInstance(autoCompleteType));
    }
    catch(Exception^ e)
    {
    Marshal::ReleaseComObject(autoComplete2);
    autoComplete2 = nullptr;
    }


Third, I need to bind it to an TextBox control:
.. code-block::

    bool AutocompleteBindingSource::Bind()
    {
        if (nullptr==this->autoComplete2)
            return false;
        try
        {
            this->autoComplete2->SetOptions((int)ControlToBind->AutoCompleteMode);
            this->autoComplete2->Init(
            HandleRef(ControlToBind,ControlToBind->Handle),
            this,
            String::Empty
            ,String::Empty);
            return true;
        }
        catch(Exception^e)
        {
            return false;
        }
    }


Finally, I need to implement IEnumString to populate a list of options for the autocomplete object. Luckily, .Net has declared this interface, so I don't need to port it to managed code, however, I still need to write my binding code in my implementation of IEnumString.

.. code-block:: 

    void AutocompleteBindingSource::Reset()
    {
        this->current = 0;
        if(BindingSource!=nullptr)
        this->size=BindingSource->Count;
    }

    int AutocompleteBindingSource::Next(
        int celt, [Out, MarshalAs(UnmanagedType::LPArray, ArraySubType=UnmanagedType::LPWStr, SizeParamIndex=0)] array<String^>^ rgelt, IntPtr pceltFetched)
    {
        if (celt < 0)
        {
            return E_INVALIDARG;
        }
        int index = 0;
        while ((this->current < this->size) && (celt > 0))
        {
            Object^ item=this->BindingSource->default[this->current];

            bool useDisplayMember=false;

            if(!String::IsNullOrEmpty(DisplayMember))
            {
                ICustomTypeDescriptor^ customTypeDescriptor=dynamic_cast<ICustomTypeDescriptor^>(item);
                if(customTypeDescriptor!=nullptr)
                {
                    PropertyDescriptorCollection^ propertyDescriptorCollection=
                    customTypeDescriptor->GetProperties();
                    if(propertyDescriptorCollection!=nullptr)
                    {
                        PropertyDescriptor^ propertyDescriptor=propertyDescriptorCollection->default[DisplayMember];
                        if(propertyDescriptor!=nullptr)
                        {
                            rgelt[index] = propertyDescriptor->GetValue(item)->ToString();
                            useDisplayMember=true;
                        }
                    }
                }
            }

            if(!useDisplayMember)
            {
                if(item!=nullptr)
                {
                    rgelt[index] = item->ToString();
                }
            }
            this->current++;
            index++;
            celt–;
        }
        if ((pceltFetched != IntPtr::Zero))
        {
            Marshal::WriteInt32(pceltFetched, index);
        }
        if ((celt != 0))
        {
            return 1;
        }
        return 0;
    }


Here the DisplayMember property is the name of the property in the data source to be displayed. If the property specified by the value of the DataMember property does not exist, I use ToString to get a text representation of the current item in the data source.

You may want to ask, where is the filtering code? Well, that is implemented by BindingSource class.

.. code-block:: C++

    System::Void FormTest::textBoxDemo_TextChanged(System::Object^  sender, System::EventArgs^  e)
    {
        static bool inThisFunction=false;
        if(!inThisFunction)
        {
            inThisFunction=true;
            if(String::IsNullOrEmpty(textBoxDemo->Text))
                bindingSourceAutoComplete->Filter=nullptr;
            else
            {
                System::String^ addText=textBoxDemo->Text+"og/NextElement";
                dataSetDemo->Tables[0]->DefaultView->Sort="Text";
                if(dataSetDemo->Tables[0]->DefaultView->FindRows(addText)->Length==0)
                {
                    System::Data::DataRow^ row=dataSetDemo->Tables[0]->NewRow();
                    row->default[0]=addText;
                    dataSetDemo->Tables[0]->Rows->Add(row);
                }
                bindingSourceAutoComplete->Filter=
                String::Format("{0} LIKE '{1}%'"
                ,dataSetDemo->Tables[0]->Columns[0]->Caption
                ,textBoxDemo->Text);
            }
            if(textBoxDemo->SelectionStart>0)
            {
                autocompleteBindingSource1->Reset();
                autocompleteBindingSource1->Bind();
                String^ text=textBoxDemo->Text;
                int selectionStart=textBoxDemo->SelectionStart;
                int selectionLength=textBoxDemo->SelectionLength;
                textBoxDemo->SelectionStart=0;
                textBoxDemo->SelectionLength=0;
                textBoxDemo->SelectAll();
                System::Windows::Forms::SendKeys::SendWait("{BACKSPACE}");
                textBoxDemo->Text=text;
                textBoxDemo->SelectionStart=selectionStart-1;
                textBoxDemo->SelectionLength=selectionLength+1;
                System::Windows::Forms::SendKeys::SendWait(textBoxDemo->SelectedText);
            }
            inThisFunction=false;
        }
    }

Somehow Windows caches the candidate list. If I don't clear the text in the input box, my IEnumString implementation won't be asked again for candidate strings (pointed out by Andy Gilman).

The BindingSource class checks the data source to see if they support the IBindingListView. If IBindingListView is supported, the BindingSource class delegates sorting and filtering to the data source.  In this sample, the data source of the BindingSource object is a DataSet, and the DataMember of BindingSource object is the name of the first table , so BindingSource creates a DataView as its data source. The DataView class implements IBindingListView and filters its data using expressions parsed from the filter string. In reality, the data source could be a business object that implements IBindingListView and supports filtering and sorting with stored procedures.

This sample does not consider compound autocomplete object support. If you want to get your options from multiple sources, you need to use IObjMgrto add sources to the autocomplete object.