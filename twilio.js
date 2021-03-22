const twilio = require('twilio');

const accountSid = 'ACe2e285f3095822602e93092d594a1fe1';
const authToken = 'e604102c8e3ae9e3dfdbed5c12e27a80';

module.exports = new twilio.Twilio(accountSid,authToken);
