.. meta::
   :description: My mom received this email and asked me verification. It is obvious fake, but the red flags are worth noting. The only help from the email provider is marking t

Today's phishing email RE: Your A⁮pp឵Ie lD Has Been Di⁫sabIed Pending Further Verification
=====================================================================================================
.. post:: 3, Jan, 2025
   :category: Computers and Internet
   :author: me
   :nocomments:

My mom received this email and asked me verification. It is obvious
fake, but the red flags are worth noting.

The only help from the email provider is marking the email as sent by
mail.txu.com. Which is still spoofed, but nevertheless makes the email
suspicious, as the email pretends to be from Apple. There is also a clue
in the email itself, the terms of service URL in the email somehow
points to Netflix, probably to filter out people too smart to attack.

More than meets the eye is the sender address, which is base 64 encoded,
the biggest red flag. The sender address value is
=?UTF-8?B?aUPzoIW/86CFv0nzoIW/86CFv2/zoIW/86CFv3U=?=
=?UTF-8?B?86CFv/Oghb9k?= mail@txu.com. the parts between =?UTF-8?B? and
?= are base 64 encoded. Translated to plain text as

#. 69 (small letter i)
#. 43(capital C)
#. F3-A0-85-BF(U+E017F, a glyph variant for a preceding character)
#. F3-A0-85-BF
#. 49(l)
#. F3-A0-85-BF
#. F3-A0-85-BF
#. 6F (o)
#. F3-A0-85-BF
#. F3-A0-85-BF
#. 75 (u)
#. F3-A0-85-BF
#. F3-A0-85-BF
#. 64 (d)

Basically a fancy writing of iCloud. If you see the font or letter for
sender address is slightly off from your usual font in your email, the
email is probably not authentic. If you are on a mobile device, zoom in
and compare the font of the same letter used in email address and the
rest of web page (especially the letters from the email software or web
site itself).

There are more obvious signs. The Return-Path:
<T4eN5CKib3yjuft3h35chyeVOw2ZlU2x07OdJR3EkUjBHKhNypSBuUfM@8020inc.net>
does not sound very Apple-like either. And don’t get me started with the
Subject =?UTF-8?Q?Your_A=E2=81=AEpp=E1=9E=B5Ie_lD_Has_Been?=
=?UTF-8?Q?_Di=E2=81=ABsabIed_Pending_Further_Verif?=
=?UTF-8?Q?i=E2=80=8Dcation\_=2389084003?=, which displays a very urgent
message when viewed in email clients, but the spell checker (after
clicking Reply) will tell you that the (឵) in A⁮pp(឵)Ie lD is misspelt. 

The less obvious location is the last "Received: from" address, whose
value is wqfvOLXVT484537-LOWNshnE41534.mdpmta.sys.comcast.net
(ip67-217-244-160.pbiaas.com. [67.217.244.160]), which does not match
mail.txu.com's IP 68.232.201.28. Apparently this happens to TXU
frequently enough that it has a
https://www.txu.com/fraud-awareness/suspicious-email-alert page up
telling users about phishing campaigns using their domain name, but TXU
really needs to have an active DMARC rejection policy to prevent others
from spoofing their address.

The part that can slip through even trained eye is obfuscated links like
href=3D"https://mobile.mail.yahoo.com/apps/affiliateRouter?brandUrl=3Dhttps://www.google.com/amp/t.=.
The 3D added before the quote is malformed HTML, browsers will ignore it
but spam filters probably have trouble adjust to it. The double
redirection from both https://mobile.mail.yahoo.com/apps/affiliateRouter
and https://www.google.com/amp will bypass domain based URL scanners as
the real attack URL is hidden behind  Google’s AMP framework and only
get sent by Google when the user clicked the link. See a discussion at
https://cofense.com/blog/google-amp-the-newest-of-evasive-phishing-tactic/
for details.

For those who cannot read email headers

#. Use an email service with strong filters, like Gmail.
#. Verify sender address before reading the rest of the mail.
#. If you are on a computer, mouse over link to reveal the link target.
   If the target does not match the pretended sender, stop reading.
#. Companies that do business with you will know your name and will not
   address you as “Dear Customer” or email address. A sophisticated
   cybercriminal will have your name, birthdate, address, phone number,
   and even social security number, however, so don’t bank on it.
#. Companies that do business with you will hire specialist copywriters
   for their communications. They use formal language and won’t have
   poor spelling or grammar.
#. Don’t panic even when the an email for urgent action to avoid some
   negative outcome, even more so when asked to click a link. Don’t
   interact with the email at all. Go to the official information source
   and verify.
#. Use the reply function of your email client/ web site and run the
   quoted original email through a spell checker before responding. 

Users should remain vigilant for such indicators and verify the
legitimacy of any suspicious emails through official channels. In
addition, companies like TXU should also strengthen their defenses to
prevent email spoofing. This post serves as a reminder for cybersecurity
awareness in identifying and mitigating phishing threats.

