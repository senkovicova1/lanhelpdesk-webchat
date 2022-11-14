import React from 'react';
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {
  useTranslation
} from "react-i18next";

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

  return (
    <div>
      <h1>{t('webChatSupport')}</h1>
      <div className="form">
        <FormGroup className="group">
          <Label for="name">{t('yourName')}</Label>
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
          <Label for="email">{`${t('yourEmail')}`}</Label>
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
            <Label for="description">{t('taskDescription')}</Label>
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
        <div className="row btn-row">
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