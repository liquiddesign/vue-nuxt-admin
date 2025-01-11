- měny jazyky v gridu a formu
- utils typy do DataFormu a podobne
- backend user_id -> user.id
- seznam skupin v prehledu
- Table cell eamil, phone, link, list
- uploader
- predulozeny filtr (moznost si ho ulozit jen pro me nebo globalne)
- DMS (dokument managment system)
- detail infa


// zkust v detailu formulare
// { data:paymentTypes, pending: paymentPending} = useApiFetch -> dat do select2
// { data: lists, pending: listsPending} = useApiList([{'paymentTypes':name}, 'sadasd'], lang);
-> eshop? opList


// datalist bude vracet i currency
// 


do data prefetch nebo jen do frontu
'homepage' => 'dashboards',
'defaultOnPage' => 10,
'defaultLang' => 'cs',
'defaultCurrency' => 'CZK',
'langs' => ['cs', 'en'],
'currencies' => ['CZK', 'EUR'],
'maxUploads' => (int) \ini_get('max_file_uploads'),
'maxFilesize' => \min($this->parseIniSize(\ini_get('upload_max_filesize')), $this->parseIniSize(\ini_get('post_max_size'))),

======

- dokazy na zaznam (administrator role ->)
- nastaveni -> ulozeni do profilu
- dokumentacky
- notification component -> notify, subcribe for topic
- komentare
- image resizer (file manager global)

// --------------------
filter[]=ic,company;LK;ttttt&
ic+company
icEQ10
icGTE10