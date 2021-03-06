export const createEmployee = (employee) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('employees').add({
      ...employee,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_EMPLOYEE_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_EMPLOYEE_ERROR' }, err);
    });
  }
};