import React, {
  useEffect
} from 'react';
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import {
  useTranslation
} from "react-i18next";
import Select from 'react-select';
import {
  pickSelectStyle
} from "configs/components/select";
import {
  languages
} from "configs/constants";
import i18n from "i18next";

import {
  formatDistanceToNow,
} from 'date-fns'

import classnames from 'classnames';

export default function WebChatConversation(props) {

  const {
    conversation,
    messages,
    webchatId,
    sendMessage,
  } = props;

  const {
    t
  } = useTranslation();

  const [comment, setComment] = React.useState("");
  const [errors, setErrors] = React.useState([]);
  const [saving, setSaving] = React.useState(false);

  const [language, setLanguage] = React.useState(languages[0]);

  useEffect(() => {
    var elem = document.getElementById('comments');
    elem.scrollTop = elem.scrollHeight;
  }, [conversation]);

  return (
    <div>
      <div className="header">
        <h1>{t('webChatSupport')}</h1>
        <Select
          styles={pickSelectStyle()}
          options={languages}
          value={language}
          onChange={lang => {
            setLanguage(lang);
            i18n.changeLanguage(lang.value);
          }}
        />
      </div>
      <div className="form">
        <div className="comments" id="comments">
          {false &&
            <div
              key="link-message"
              className="comment bolder color-white font-15-f"
              style={{ backgroundColor: "#FFAC1C" }}
            >
              {t('yourLinkToChatIs')}
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${window.location.origin}/webchat/${webchatId}`}
              >
                {`${window.location.origin}/webchat/${webchatId}`}
              </a>
              <br />
              {t('pleaseStoreAndOpenItToContinueLater')}
            </div>
          }
          {messages.map((message) => (
            <div
              key={message.id}
              className={classnames("comment", { 'm-l-20': message.fromCustomer, 'm-r-20': !message.fromCustomer })}
              style={{ backgroundColor: message.fromCustomer ? "#d5ebd4" : "#d3dfe8" }}
            >
              <div className="row">
                <div className="icon">
                  {
                    message.fromCustomer &&
                    <i className="fa fa-solid fa-user" />
                  }
                  {
                    !message.fromCustomer &&
                    <i className="fa fa-solid fa-headset" />
                  }
                </div>
                <div style={{ width: "calc(100% - 40px)", paddingLeft: "0px" }}>
                  <div className="row p-l-10 p-r-10">
                    <Label>{message.fromCustomer ? `${conversation.fullName} (${t('you')})` : t('support')}</Label>
                    <span>{`${formatDistanceToNow(parseInt(message.createdAt))} ago`}</span>
                  </div>
                  {message.message}
                </div>
              </div>
            </div>
          ))}
          {!conversation.active &&
            <div
              key="closed"
              className="comment"
              style={{ backgroundColor: "#B0B0B0" }}
            >
              {t('conversationClosed')}
            </div>
          }
        </div>

        <FormGroup className="group m-r-37">
          <Input
            type="textarea"
            name="comment"
            id="comment"
            placeholder={t('addComment')}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormGroup>
        <div className="row btn-row">
          <div className="m-l-auto m-r-5">
            {
              errors.length > 0 &&
              <div className="errors">
                {errors.map((error) => <p key={error} className="message warning">{t(error)}</p>)}
              </div>
            }
            <button
              className="btn"
              disabled={saving}
              onClick={() => {
                setSaving(true);
                let newErrors = [];
                if (comment.length === 0) {
                  newErrors.push('cantSendEmpty');
                  setErrors(newErrors);
                  setSaving(false);
                  return;
                }
                sendMessage({
                  variables: {
                    webchatId,
                    message: comment,
                  }
                }).then(() => {
                  setSaving(false);
                  setComment("");
                }).catch((e) => {
                  console.log(e);
                  setSaving(false);
                })
              }}
            >
              {t('submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}