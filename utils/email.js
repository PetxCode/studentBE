const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "922981826695-rviuikdrd4rk1kbsake7iusml8qb2ibc.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04C7dWmo7YblKCgYIARAAGAQSNwF-L9IrEt7Td5GJtrIEB-g_xad5nm-lvt6tP-RxNPBAoaHu0q1jNXf8c20Bsv89GRyec94Gri4";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

// const url = "http://localhost:3000";
const url = "https://codelab-student.web.app";

const verifiedUser = async (email, user, value, token) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "skuulkude@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const mailOptions = {
      from: "no-reply✉️  <newstudentsportal2@gmail.com>",
      to: email,
      subject: "Account Verification",
      html: ` <p>
            Hello  <strong>${user.email}</strong>!
            <br/>
            <br/>

            This mail is to acknowledge that you are about to create an account as a student in CodeLab, please follow the link below to finish up your Registration.
              <br/>
              <br/>
And here is your Secret Code "<strong>${token}</strong>" for Logging in, Please keep it safe and save as you'd be needing it to login successfully!

            Thanks!
             <br/>
             <br/>
            Use this <strong><a
            href="${url}/api/user/${user._id}/${value}"
            >Link to Finish</a> </strong> up your account creation 
        </p>`,
    };

    const result = transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

const verifiedSignUser = async (email, user, value) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "skuulkude@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const mailOptions = {
      from: "no-reply✉️  <skuulkude@gmail.com>",
      to: email,
      subject: "Account re-Verification",
      html: `     
         <h3>
            Hello... 
            <br/>
            <br/>

            This mail is to acknowledge that you are trying to sign-in without complete account verification, as a student in CodeLab, please follow the link below to completely finish up your Registration.
              <br/>
              <br/>
            Thanks!
             <br/>
             <br/>
            Use this <strong><a
            href="${url}/api/user/${user}/${value}"
            >Link to Finish</a></strong> up your account creation 
        </h3>
        `,
    };

    const result = transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

const resetUserPassword = async (email, user, value) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "skuulkude@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const mailOptions = {
      from: "no-reply✉️  <skuulkude@gmail.com>",
      to: email,
      subject: "Password Reset Request",
      html: ` <h3>
            There is an attent to change your password, 
            
            
            <br/>
            <br/>
            
            if this is not comming from you, then there are high chances that you're being attacked... so, please ignore this mail else use the link below to finish up the process!

            <br/>
            <br/> 
            Use this <strong><a
            href="${url}/api/user/change/${user}/${value}"
            >Link to</a></strong> completely change your account password 
        </h3>`,
    };

    const result = transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  resetUserPassword,
  verifiedUser,
  verifiedSignUser,
};
