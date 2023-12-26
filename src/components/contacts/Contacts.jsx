import React from "react";
import { useTranslation } from "react-i18next";
import FormConnect from "../formConnect/FormConnect";
import "./style/Contacts.css";

const Contacts = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="main_contacts_wrapper">
        <div>
          <div className="main_block_contacts">
            <h2>Connect width Sweco</h2>
          </div>
          <div className="contacts_wrapper_two_block">
            <div className="contacts_left_block">
              <h3>Sweco headquarters</h3>
              <div className="address_block">
                <ul>
                  <li>
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/material-rounded/24/marker.png"
                      alt="marker"
                    />
                    Visiting address
                  </li>
                  <li>Sweco AB</li>
                  <li>Gjörwellsgatan 22, Box 340 44, 100 26 Stockholm</li>
                  <li>
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/ios-filled/50/phone.png"
                      alt="phone"
                    />
                    +46 8 695 60 00
                  </li>
                </ul>
              </div>
            </div>
            <div className="contacts_right_block">
              {/* <img
              src="https://staticmapmaker.com/img/google-placeholder.png"
              alt=""
            /> */}
              <ul>
                <li>
                  <span>{t("lineUnique.tps")}:</span>
                  <a
                    href="https://mail.google.com/mail/u/0/#search/kavob38356@gameszox.com"
                    target="_blank">
                    kavob38356@gameszox.com
                  </a>
                </li>
                <li>
                  <span>{t("lineUnique.3d")}:</span>
                  <a
                    href="https://mail.google.com/mail/u/0/#search/kavob38356@gameszox.com"
                    target="_blank">
                    kavob38356@gameszox.com
                  </a>
                </li>
                <li>
                  <span>{t("lineUnique.metall")}:</span>
                  <a
                    href="https://mail.google.com/mail/u/0/#search/kavob38356@gameszox.com"
                    target="_blank">
                    kavob38356@gameszox.com
                  </a>
                </li>
                <li>
                  <span>{t("lineUnique.eng")}:</span>
                  <a
                    href="https://mail.google.com/mail/u/0/#search/kavob38356@gameszox.com"
                    target="_blank">
                    kavob38356@gameszox.com
                  </a>
                </li>
                <li>
                  <span>{t("lineUnique.logis")}:</span>
                  <a
                    href="https://mail.google.com/mail/u/0/#search/kavob38356@gameszox.com"
                    target="_blank">
                    kavob38356@gameszox.com
                  </a>
                </li>
                <li>
                  <span>{t("lineUnique.vent")}:</span>
                  <a
                    href="https://mail.google.com/mail/u/0/#search/kavob38356@gameszox.com"
                    target="_blank">
                    kavob38356@gameszox.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="contacts_img_content_wrapper">
            <div
              style={{
                backgroundImage:
                  "url(https://www.swecogroup.com/wp-content/uploads/sites/2/2023/07/Sweco-office-stockholm-lounge-area-1680x560.jpg",
              }}
              className="img_block">
              <p>Learn more about our headquarters in Stockholm</p>
            </div>
          </div>
        </div>
        <div id="section6">
          <FormConnect />
        </div>
      </div>
    </>
  );
};

export default Contacts;
