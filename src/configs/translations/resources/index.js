import {
  testingTranslations,
} from '../../main';
import general from './general';
import components from './components';

const resources = {
  ...general,
  ...components,
}

//compare keys if same throw error
//get keys of all objects, filter duplicates, throw them in error
if (testingTranslations) {
  const test = [
    ...Object.keys(general),
    ...Object.keys(components),
  ]
  //console.log( test.length );

  const testResult = test.filter((key, index) => test.findIndex((key2) => key2 === key) !== index);
  if (testResult.length > 0) {
    throw new Error(`Some thranslations have duplicate keys: ${testResult.join(', ')}`);
  }
}
export default resources;