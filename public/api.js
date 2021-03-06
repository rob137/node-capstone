// -------------- GET --------------------
function getDataUsingEmail(emailInput) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/users/${emailInput}`,
      dataType: 'json',
      method: 'GET',
    })
      .done((response) => {
        loadPersonalisedPage(response);
        setCookie('email', emailInput, 365);
        closeMenusOnEsc(response);
        resolve();
      })
      .fail(() => {
        showLoginEmailValidationWarning();
        reject();
      });
  });
}

// ---------------- DELETE -----------------
function deleteProfile(editedUserData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/users/${editedUserData.id}`,
      contentType: 'application/json',
      data: JSON.stringify({
        id: editedUserData.id,
      }),
      method: 'DELETE',
    })
      .done(() => {
        $('.js-confirm').html('').hide();
        logout();
        resolve();
      })
      .fail(() => {
        console.error('Error completing DELETE request');
        reject();
      });
  });
}


// ---------------- PUT -----------------
function submitAndRefresh(editedUserData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/users/${editedUserData.id}`,
      contentType: 'application/json',
      data: JSON.stringify({
        id: editedUserData.id,
        budget: editedUserData.budget,
        giftLists: editedUserData.giftLists,
      }),
      method: 'PUT',
    })
      .done((response) => {
        loadPersonalisedPage(response);
        resolve();
      })
      .fail(() => {
        console.error('Error submitting PUT request');
        reject();
      });
  });
}

// ---------------- PUT -----------------
function submitAndRefreshBudget(editedUserData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/users/${editedUserData.id}`,
      contentType: 'application/json',
      data: JSON.stringify({
        id: editedUserData.id,
        budget: editedUserData.budget,
        giftLists: editedUserData.giftLists,
      }),
      method: 'PUT',
    })
      .done((response) => {
        loadPersonalisedPage(response);
        presentBudgetPage();
        highlightBudgetNavTab();
        resolve();
      })
      .fail(() => {
        console.error('Error submitting PUT request');
        reject();
      });
  });
}

// ----------------- POST -------------------------
function postNewAccount(firstNameInput, emailInput) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/users',
      contentType: 'application/json',
      data: JSON.stringify({
        firstName: firstNameInput,
        email: emailInput,
      }),
      method: 'POST',
    })
      .done((response) => {
        resetHtml();
        // Load user's gift list!
        getDataUsingEmail(emailInput);
        setCookie('email', emailInput, 365);
        closeMenusOnEsc(response);
        resolve();
      })
      .fail(() => {
        console.error('Error completing POST request for new user account - user data not received');
        showLoginEmailValidationWarning();
        loadLoginOrRegisterHtml();
        reject();
      });
  });
}
