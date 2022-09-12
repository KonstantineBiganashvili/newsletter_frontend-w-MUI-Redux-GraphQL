import { validEmail, validString } from './validators';

const useValidation = (inputs) => {
  const { title, name, surname, categoryId, date, phone, email, content } =
    inputs;
  const errorsObject = {};

  (!title.trim() || !validString(title)) &&
    (errorsObject.title = 'Title Must Be At Least 2 Characters Long');

  (!name.trim() || !validString(name)) &&
    (errorsObject.name = 'Name Must Be At Lsat 2 Characters Long');

  (!surname.trim() || !validString(surname)) &&
    (errorsObject.surname = 'Surname Must Be At Lsat 2 Characters Long');

  (Number.isNaN(categoryId) || !categoryId) &&
    (errorsObject.category = 'Please Select Category');

  !date.trim() && (errorsObject.date = 'Please Select Date');

  (!phone.trim() || Number.isNaN(phone)) &&
    (errorsObject.phone = 'Please Enter Phone Number');

  (!email.trim() || !validEmail(email)) &&
    (errorsObject.email = 'Please Enter Email');

  !content.trim() && (errorsObject.content = 'Please Enter Content');

  return errorsObject;
};

export default useValidation;
