const sendGrid = require("sendgrid");
const helper = sendGrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  //constructor needs at least subject and recipients from survey.body to set up
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendGrid(keys.sendGrid_API_Key);
    //Email constructor
    this.from_email = new helper.Email("no-replay@esurvey.com");
    this.subject = subject;
    //Content constructor
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    //need to register content to mailer
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => personalize.addTo(recipient));
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    return await this.sgApi.API(request);
  }
}

module.exports = Mailer;
