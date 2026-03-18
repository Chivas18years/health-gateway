const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MESSAGE = encodeURIComponent("Precisa de ajuda com seu atestado?");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Suporte via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-float transition-transform hover:scale-110 active:scale-95"
      style={{ backgroundColor: "#25D366" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.358.636 4.663 1.84 6.688L2.667 29.333l6.854-1.797A13.267 13.267 0 0 0 16.003 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.003 2.667zm0 24.267a11.042 11.042 0 0 1-5.624-1.536l-.403-.24-4.069 1.066 1.085-3.963-.264-.41A11.01 11.01 0 0 1 4.987 16c0-6.075 4.942-11.013 11.016-11.013S27.013 9.925 27.013 16 22.075 26.934 16.003 26.934zm6.044-8.248c-.33-.165-1.954-.965-2.257-1.075-.304-.11-.525-.165-.747.165-.22.33-.855 1.075-1.048 1.296-.193.22-.385.247-.715.082-.33-.165-1.393-.514-2.652-1.637-.98-.875-1.642-1.954-1.834-2.284-.193-.33-.02-.508.145-.672.149-.147.33-.385.495-.577.165-.193.22-.33.33-.55.11-.22.055-.413-.027-.578-.082-.165-.747-1.8-1.022-2.467-.269-.648-.543-.56-.747-.57-.193-.01-.413-.012-.633-.012-.22 0-.578.082-.88.413-.302.33-1.155 1.129-1.155 2.754s1.183 3.195 1.348 3.415c.165.22 2.328 3.555 5.643 4.987.789.34 1.404.543 1.884.695.792.251 1.512.216 2.083.131.635-.095 1.954-.799 2.23-1.57.275-.771.275-1.432.193-1.57-.082-.137-.303-.22-.633-.385z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
