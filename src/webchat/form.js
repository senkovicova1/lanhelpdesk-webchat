import React from 'react';
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
  isEmail
} from '../helperFunctions';

export default function WebChatForm(props) {

  const {
    createHelpdeskRequest,
    saving,
  } = props;

  const {
    t
  } = useTranslation();

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [errors, setErrors] = React.useState([]);

  const [language, setLanguage] = React.useState(languages[0]);

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
        <FormGroup className="group">
          <Label for="name">{`${t('yourName')} *`}</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder={t('yourName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="group">
          <Label for="email">{`${t('yourEmail')} *`}</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder={t('yourEmail')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="group">
          <div>
            <Label for="description">{`${t('taskDescription')} *`}</Label>
          </div>

          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder={t('writeAShortDescription')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <div className="row btn-row" style={{ justifyContent: "flex-end" }}>
          {
            errors.length > 0 &&
            <div className="errors">
              {errors.map((error) => <span key={error} className="message warning">{t(error)}</span>)}
            </div>
          }
          <button
            className="btn"
            disabled={saving}
            onClick={() => {
              let newErrors = [];
              if (email.length > 0 && !isEmail(email)) {
                newErrors.push('notValidEmail');
              }
              if (name.length === 0 || description.length === 0) {
                newErrors.push('fillAllReqItems');
              }
              setErrors(newErrors);
              if ((email.length === 0 || isEmail(email)) && name.length > 0 && description.length > 0) {
                createHelpdeskRequest({
                  email,
                  name,
                  description,
                });
              }
            }}
          >
            {t('create')}
          </button>
        </div>
      </div>
    </div>
  );
}