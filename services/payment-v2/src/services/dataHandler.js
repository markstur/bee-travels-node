import CreditCardExpiredError from "./../errors/CreditCardExpiredError";
import crypto from "crypto";

export async function processCreditcardPayment(chargeObject) {
  //validation
  let expMonth = chargeObject.cardDetails.expMonth;
  let expYear = chargeObject.cardDetails.expYear;

  let currentTime = new Date();
  // returns the month (from 0 to 11)
  let currentMonth = currentTime.getMonth() + 1;
  // returns the year (four digits)
  let currentYear = currentTime.getFullYear();

  if (expYear < currentYear) {
    throw new CreditCardExpiredError("Card expired");
  }
  if (expYear === currentYear && expMonth < currentMonth) {
    throw new CreditCardExpiredError("Card expired this year");
  }
  const confirmationId = crypto.randomBytes(16).toString("hex");
  return { confirmationId: confirmationId };
}

export async function getExampleChargeData(exp_month, exp_year) {
  return {
    invoice: "invoice_73BC3",
    statement_descriptor: "BeeTravels.com/r/73BC3",
    amount: 499.99,
    currency: "USD",
    status: "unprocessed",
    billing_details: {
      name: "John Doe",
      phone: "+1 (415) 777 8888",
      email: null,
      address: {
        line1: "42 Arnold Lane",
        line2: "#747",
        city: "Madrid",
        postal_code: "76NE",
        state: null,
        country: "Spain",
      },
    },
    payment_method_details: {
      creditcard_number: "4242 4242 4242 4242",
      exp_month: exp_month,
      exp_year: exp_year,
      cvc: "0017",
    },
  };
}

export async function readinessCheck() {
  return true;
}
