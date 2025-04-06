var currencyId = new Array();
currencyId['234']= 'USD';
currencyId['1']= 'EUR';
currencyId['231']= 'GBP';
currencyId['105']= 'INR';
currencyId['13']= 'AUD';
currencyId['38']= 'CAD';
currencyId['2']= 'AED';
currencyId['114']= 'JPY';
currencyId['95']= 'HKD';
currencyId['177']= 'PHP';
currencyId['198']= 'SGD';
currencyId['100']= 'HUF';
currencyId['115']= 'KES';
const ENVIRONMENT= 'production'; //production
export const Constants = {
    BASE_URL: ENVIRONMENT=='uat' ? 'https://fxmaster-dev-apim.azure-api.net/fxmaster-api/v1/' : "https://fxmaster-prod-apim.azure-api.net/fxmaster-api-prod/v1/",
    SUBSCRIPTION_KEY: ENVIRONMENT=='uat' ? "b305f7379fcb4ac1a7287c7666f03d7a" : "83a68075ae6b41b88ee508722b29ed35",
    FXMASTER_BASE_URL: ENVIRONMENT=='uat' ? "https://uat.fxmaster.co.uk/" : "https://adminfxmaster.com/",
    FILE_PATH_BASE_URL: ENVIRONMENT=='uat' ? "https://fxmaster1.blob.core.windows.net/fxmaster-uat/" : "https://fxmaster1.blob.core.windows.net/fxmaster-prod/",
    REPORTS_BASE_URL: ENVIRONMENT=='uat' ? 'https://uat-reports.fxmaster.co.uk/' : 'https://reports.fxmaster.co.uk/',
    REPORTS_USER_NAME: ENVIRONMENT=='uat' ? 'shreyanshu@fxmaster.co.uk' : 'report@fxmaster.co.uk',
    REPORTS_PASSWORD: ENVIRONMENT=='uat' ? 'Fxmaster@6713' : '7tKePDFs6HXzeb9',
    CURRENCYID: currencyId,
    MAINTENANCE: false,
    TRANSACTION_STATUS: ["Settled","submitted","completed","accepted","Cancelled","declined","deleted","failed","pending","ready_to_send","rejected","Returned","Fees"],
    BULK_UPLOAD_TRANSACTION_STATUS: ["Settled","Submitted","Cancelled","Failed","Pending","Rejected","Returned"]
}