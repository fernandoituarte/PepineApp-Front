"use client";

export const SendEmailButton = ({ email }) => {
  // Function to initiate an email to the user using the default mail client.
  const sendEmail = () => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <button
      onClick={() => sendEmail()}
      className="w-full mt-2 py-2 text-white bg-[#be5710] rounded-lg hover:bg-[#be561083]"
    >
      Envoyer un email
    </button>
  );
};
