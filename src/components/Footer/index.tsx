import Link from "next/link";
import { FaLock, FaShieldHalved, FaWhatsapp } from "react-icons/fa6";

const { COMPANY_NAME, SITE_NAME } = process.env;

interface FooterProps {}

const LINKS_UTIS = [
  {
    name: "Aviso Legal",
    url: "aviso-legal",
  },
  {
    name: "Terms de Serviço",
    url: "termos-de-servico",
  },
  {
    name: "Política de Privacidade",
    url: "politica-de-privacidade",
  },
  {
    name: "Política de Reembolso ",
    url: "politica-de-reembolso",
  },
  {
    name: "Política de Trocas e Devolução ",
    url: "politica-de-trocas-e-devolucao",
  },
];

export const Footer = (props: FooterProps) => {
  const copyrightName = COMPANY_NAME || SITE_NAME || "";
  return (
    <footer className="bg-[#660099]  py-4 text-white ">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-8 px-4 py-6 lg:py-8">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase">
              Contato
            </h2>
            <ul className="text-gray-100 font-medium text-xs">
              <li className="mb-4">
                <p className="font-extralight flex flex-col">
                  <span className="font-medium">Fale conosco pelo e-mail:</span>
                  contato@aedigi.com.br <br />
                  ou telefone: (19) 99302-8888
                </p>
              </li>
              <li className="mb-4">
                <address className="font-extralight flex flex-col">
                  <span className="font-medium">Horário de atendimento:</span>
                  Segunda a Sexta-feira das 8h às 18hrs
                </address>
              </li>
              <li className="mb-4">
                <p className="font-extralight flex flex-col">
                  <span className="font-medium">Endereço:</span>
                  Av. Dr. Carlos de Campos, 935
                  <br />
                  Vila Industrial - Campinas-SP
                  <span>
                    Cep: <code>13035-610</code>
                  </span>
                  <span>
                    CNPJ: <code>40.260.166/0001-61</code>
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase dark:text-white">
              Links Úteis
            </h2>
            <ul className="text-gray-300 font-medium text-sm">
              {LINKS_UTIS.map((item) => (
                <li className="mb-2" key={item.url}>
                  <Link href={`/policies/${item.url}`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase dark:text-white">
              Precisa de ajuda?
            </h2>
            <ul className="text-gray-100 font-semibold text-xs">
              <li className="mb-4 font-thin ">
                <Link
                  type="button"
                  className=" w-[210px] flex flex-row gap-2 items-center font-normal"
                  href="https://api.whatsapp.com/send?phone=5519993028888&text=Olá, sou André, da equipe AE Digi Store?"
                >
                  <FaWhatsapp size={20} className="text-green-600" />
                  +55 (19) 99302-8888
                </Link>
              </li>

              {/* <li className="mb-4">
                <a
                  href="/"
                  className="hover:underline px-6 py-2 uppercase hover:cursor-default bg-gray-100 text-gray-600 ring-1 ring-gray-500 rounded-sm text-sm"
                >
                  entre em contato
                </a>
              </li> */}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-100 uppercase dark:text-white">
              Site Seguro
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium text-sm">
              <li className="mb-4">
                <ul>
                  <li className="mb-2">
                    <button
                      type="button"
                      className="bg-gray-100 text-gray-600 px-8 py-1 uppercase text-base flex items-center gap-2 w-[214px]"
                    >
                      <FaShieldHalved size={20} />
                      <span className="text-xs"> Ambiente Seguro</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="bg-gray-100 text-gray-600 px-8 py-1 uppercase text-base flex items-center gap-2 w-[214px]"
                    >
                      <FaLock size={20} />
                      <span className="text-xs"> certificado ssl</span>
                    </button>
                  </li>
                </ul>
              </li>
              <li className="mb-4 ">
                <span className="visually-hidden sr-only">Payment methods</span>
                <ul
                  className="list list-payment flex flex-row gap-2 justify-start items-center"
                  role="list"
                >
                  <li className="list-payment__item">
                    <svg
                      className="icon icon--full-color"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      viewBox="0 0 38 24"
                      width="38"
                      height="24"
                      aria-labelledby="pi-american_express"
                    >
                      <title id="pi-american_express">American Express</title>
                      <g fill="none">
                        <path
                          fill="#000"
                          d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z"
                          opacity=".07"
                        ></path>
                        <path
                          fill="#006FCF"
                          d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"
                        ></path>
                      </g>
                    </svg>
                  </li>
                  <li className="list-payment__item">
                    <svg
                      className="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      width="38"
                      height="24"
                      aria-labelledby="pi-boleto"
                    >
                      <title id="pi-boleto">Boleto</title>
                      <path
                        fill="#fff"
                        d="M35.7 23.965H2.3a2.307 2.307 0 0 1-2.3-2.3v-19.4C0 1 1.035-.035 2.3-.035h33.4c1.265 0 2.3 1.035 2.3 2.3v19.4c0 1.265-1.035 2.3-2.3 2.3z"
                      ></path>
                      <path
                        fill="#A7A8AB"
                        d="M35.564 23.965H2.436c-1.344 0-2.436-1.077-2.436-2.4v-19.2c0-1.323 1.092-2.4 2.436-2.4h33.128c1.344 0 2.436 1.077 2.436 2.4v19.2c0 1.323-1.092 2.4-2.436 2.4zM2.436.925c-.806 0-1.462.646-1.462 1.44v19.2c0 .794.656 1.44 1.462 1.44h33.128c.806 0 1.462-.646 1.462-1.44v-19.2c0-.794-.656-1.44-1.462-1.44H2.436z"
                        opacity=".25"
                      ></path>
                      <path
                        d="M8.079 4.945h.7v6.298h-.7zm-1.83 0h.7v6.298h-.7zm7.256 0h1.901v6.298h-1.901zm9.715 0h.95v6.298h-.95zm2.324 0h.95v6.298h-.95zm3.804 0h1.221v6.298h-1.221zm-1.375 0h.395v6.298h-.395zm-6.389 0h.395v6.298h-.395zm-.845 0h.395v6.298h-.395zm-2.746 0h.395v6.298h-.395zm-6.31 0h.395v6.298h-.395zm-1.163 0h.733v6.298h-.733zM6.249 19.3v-6.478H8.68c.495 0 .891.065 1.191.196.299.131.532.333.701.606.17.271.255.556.255.855 0 .276-.075.537-.225.781a1.604 1.604 0 0 1-.679.593c.392.115.694.311.903.588.211.276.317.603.317.98 0 .305-.065.587-.193.847a1.644 1.644 0 0 1-.475.603c-.189.14-.425.247-.709.32a4.328 4.328 0 0 1-1.046.109H6.248zm.86-3.755H8.51c.38 0 .653-.026.817-.075a.903.903 0 0 0 .493-.324.936.936 0 0 0 .166-.567 1.03 1.03 0 0 0-.155-.568c-.103-.164-.25-.278-.442-.338s-.52-.09-.985-.09H7.109v1.963zm0 2.995h1.614c.277 0 .472-.011.585-.032.196-.035.362-.094.495-.176a.946.946 0 0 0 .327-.362c.086-.158.128-.341.128-.547 0-.243-.062-.452-.187-.632a.978.978 0 0 0-.516-.377c-.219-.072-.535-.109-.947-.109H7.109v2.235zm4.813-1.588c0-.867.241-1.509.725-1.927.403-.347.896-.52 1.476-.52.644 0 1.172.211 1.582.633.409.421.614 1.004.614 1.748 0 .603-.09 1.077-.271 1.422a1.92 1.92 0 0 1-.792.805 2.292 2.292 0 0 1-1.132.286c-.657 0-1.188-.21-1.594-.63-.406-.421-.608-1.027-.608-1.817zm.814.002c0 .6.131 1.05.394 1.347.264.299.594.448.994.448.395 0 .724-.149.988-.449.262-.3.394-.757.394-1.371 0-.579-.133-1.018-.397-1.315a1.261 1.261 0 0 0-.985-.448c-.4 0-.73.148-.994.445-.262.297-.394.745-.394 1.344zm4.498 2.346v-6.478h.796V19.3h-.796zm5.231-1.52l.823.109c-.128.478-.368.85-.718 1.114-.35.264-.796.397-1.341.397-.685 0-1.227-.211-1.629-.633-.401-.421-.602-1.013-.602-1.775 0-.787.202-1.399.608-1.834.406-.436.932-.653 1.579-.653.626 0 1.137.213 1.534.639.397.427.596 1.027.596 1.8l-.004.211h-3.497c.03.514.175.909.437 1.182a1.3 1.3 0 0 0 .979.41c.291 0 .54-.077.745-.231.207-.154.369-.4.49-.737zm-2.606-1.276h2.615c-.035-.395-.136-.691-.3-.888a1.216 1.216 0 0 0-.983-.46c-.365 0-.671.122-.92.366-.247.244-.385.572-.412.982zm6.164 2.086l.109.703a2.951 2.951 0 0 1-.599.071c-.288 0-.511-.045-.671-.137-.158-.092-.27-.211-.335-.36s-.097-.463-.097-.941v-2.705h-.588v-.615h.588v-1.161l.796-.478v1.639h.796v.615h-.796v2.751c0 .228.014.374.042.439a.324.324 0 0 0 .136.155.53.53 0 0 0 .271.057l.347-.032zm.487-1.638c0-.867.241-1.509.725-1.927.403-.347.896-.52 1.476-.52.644 0 1.172.211 1.582.633.409.421.614 1.004.614 1.748 0 .603-.09 1.077-.271 1.422a1.92 1.92 0 0 1-.792.805 2.292 2.292 0 0 1-1.132.286c-.657 0-1.188-.21-1.594-.63-.406-.421-.608-1.027-.608-1.817zm.814.002c0 .6.131 1.05.394 1.347.264.299.594.448.994.448.395 0 .724-.149.988-.449.262-.3.394-.757.394-1.371 0-.579-.133-1.018-.397-1.315a1.261 1.261 0 0 0-.985-.448c-.4 0-.73.148-.994.445-.262.297-.394.745-.394 1.344z"
                        fill="#221F1F"
                      ></path>
                    </svg>
                  </li>
                  <li className="list-payment__item">
                    <svg
                      className="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      width="38"
                      height="24"
                      aria-labelledby="pi-master"
                    >
                      <title id="pi-master">Mastercard</title>
                      <path
                        opacity=".07"
                        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                      ></path>
                      <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                      <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                      <path
                        fill="#FF5F00"
                        d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                      ></path>
                    </svg>
                  </li>
                  <li className="list-payment__item">
                    <svg
                      className="icon icon--full-color"
                      viewBox="0 0 38 24"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      width="38"
                      height="24"
                      aria-labelledby="pi-visa"
                    >
                      <title id="pi-visa">Visa</title>
                      <path
                        opacity=".07"
                        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                      ></path>
                      <path
                        d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                        fill="#142688"
                      ></path>
                    </svg>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="px-4 pb-4 pt-8 h-6  md:flex md:items-center md:justify-center mx-auto max-w-7xl border-t border-white/10">
          <span
            className="text-sm text-gray-200 dark:text-gray-300 text-center"
            data-testid="info-business"
          >
            © {new Date().getFullYear()} AE Digi Solutions Inc. Todos os
            direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
};
