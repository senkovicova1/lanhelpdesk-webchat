import {
  testingTranslations,
} from '../../../main';
import buttons from './buttons';
import forms from './forms';

const generalResources = {
  ...buttons,
  ...forms,
}

if (testingTranslations) {
  //compare keys if same throw error
  //get keys of all objects, filter duplicates, throw them in error
  const test = [
    ...Object.keys(buttons),
    ...Object.keys(forms),
  ]

  const testResult = test.filter((key, index) => test.findIndex((key2) => key2 === key) !== index);
  if (testResult.length > 0) {
    throw new Error(`Some thranslations have duplicate keys: ${testResult.join(', ')}`);
  }
}
export default generalResources;