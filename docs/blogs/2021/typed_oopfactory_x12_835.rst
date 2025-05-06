Converting generic OopFactory.X12 structures to typed counterparts
========================================================================

.. post:: 30 Apr, 2021
   :tags: OopFactory.X12, 835, 837, EDI
   :category: C#, EDI
   :author: me
   :nocomments:

.. index:: pair: OopFactory.X12; EDI

OopFactory.X12 can parse EDI messages into segments and loops. However despite typed segments and loops exist, the parser does not generate them in the object model.  The unit test only use them when generating EDI messages.

The typed segments and loops are aggregative objects that do not contain their own data members besides the contained untyped objects. Which means if I replace the contained object with the generic one from the parser via .Net reflection, then I can access the object model in a typed way. So I created this in a static class

.. code-block:: C#

    public static void SetFieldValue(this object obj, string name, object value)
    {
                // Set the flags so that private and public fields from instances will be found
                var bindingFlags = BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance;
                var field = obj.GetType().GetField(name, bindingFlags);
                field.SetValue(obj, value);
    }
    public static T AsTypedSegment<T>(this OopFactory.X12.Parsing.Model.Segment segment)
                where T: OopFactory.X12.Parsing.Model.TypedSegment,new()

    {
                if (segment == null) return null;
                T result = new T();
                result.SetFieldValue("_segment", segment);
                return result;
    }
    public static T AsTypedLoop<T>(this OopFactory.X12.Parsing.Model.Loop loop)
                where T : OopFactory.X12.Parsing.Model.TypedLoop, new()

    {
                if (loop == null) return null;
                T result = new T();
                result.SetFieldValue("_loop", loop);
                return result;
    }


Then I use them to convert the generic segments and loops from the parser to typed ones. The example is for parsing a 835 file, for other types the loop numbers and segments may be different.

.. code-block:: C#

    string fileText = System.IO.File.ReadAllText(fileName);
    List<Interchange> envelopes = parser.ParseMultiple(fileText);
    if (envelopes.Count == 0) return null;

    var isa = envelopes[0];

    var gs = isa.FunctionGroups.ElementAt(0);

    var st = gs.Transactions[0];

    var payerLoops = st.Loops.Where(l => l.Specification.LoopId.Equals("1000A"));

    var payerLoop = payerLoops.FirstOrDefault();
    var payerName = payerLoop.AsTypedLoop<TypedLoopN1>().N102_Name;

    var payerIdSegment = payerLoop.Segments
                        .Where(s => s.SegmentId.Equals("REF")
                            && s.GetElement(1).Equals("2U")).FirstOrDefault();
    if (payerIdSegment != null)
    {
            var payerId = payerIdSegment.AsTypedSegment<TypedSegmentREF>().REF02_ReferenceId;
    }

    var paymentLoops = st.Loops.Where(l => l.Specification.LoopId.Equals("2000"));

    foreach (var paymentLoop in paymentLoops)
    {

            var claimPaymentInformationLoops = paymentLoop.Loops.
                            Where(l => l.Specification.LoopId.Equals("2100"));

        foreach (var claimPaymentInformationLoop in claimPaymentInformationLoops)
            {
                    var mrnSegment = claimPaymentInformationLoop.Segments.Where
                            (s => s.SegmentId.Equals("REF") && s.GetElement(1).Equals("EA")).FirstOrDefault()
                            .AsTypedSegment<TypedSegmentREF>();
                    if (mrnSegment != null)
                    {
                                var patientMrn = mrnSegment.REF02_ReferenceId;
                    }
            }
    }


The library is written for 837, thus many types used in 835 like loop 2000 and segment CLP are not defined.