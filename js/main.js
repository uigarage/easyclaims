var app = {

  //  Buttons used in app
  buttons: {
    $btnStart: $("#btnStart"),
    $btnLogin: $("#btnLogin"),
    $btnWizard: $('.btn-wizard'),
    $btnSideBarPolicy: $("#btnSideBarPolicy"),
    $btnSideBarClaims: $("#btnSideBarClaims"),
    $btnSideBarPersonal: $("#btnSideBarPersonal")
  },

  dropdowns: {
    selectClaimProcess: $("#selClaimProcess")
  },

  selectBoxes: {
    $policyWizardSelectionBoxes: $("#policyWizard .select-box"),
    $claimsSelectionBoxes: $("#claimsSelection .select-box"),
  },

  text: {
    $txtPolicyCover: $("#txtPolicyCover"),
    $txtClaimsSelected: $("#txtClaimsSelected")
  },

  //  Pages 
  pages: {
    $intro: $("#intro"),
    $loginPage: $("#loginPage"),
    $policyInformation: $("#policyInformation"),
    $policyWizard: $("#policyWizard"),
    $pageWizard: $(".page-wizard"),
    $claimDeclaration: $("#claimDeclaration"),
    $claimsSelection: $("#claimsSelection"),
    $personalInformation: $("#personalInformation")
  },

  //  Modals
  modals: {
    policySelectionError: $("#policySelectionErrorModal"),
    claimSelectionError: $("#claimSelectionErrorModal"),
    completionSuccessModal: $("#completionSuccessModal")
  },

  data: {
    selectedCover: null,
    selectedClaims: []
  }
};

//  This is kind of routing
app.buttons.$btnWizard.unbind().bind("click", function(e) {
  console.log($(this).prop('id'));
  var btnId = $(this).prop('id');

  switch (btnId) {
    case 'btnStart':
      app.pages.$intro.removeClass('active');
      app.pages.$loginPage.addClass('active');
      break;

    case 'btnLogin':
      app.pages.$loginPage.removeClass('active');
      app.pages.$policyInformation.addClass('active');
      break;

    case 'btnAgree':
      app.pages.$claimDeclaration.removeClass('active');
      app.pages.$claimsSelection.addClass('active');
      // Change the sidebar to claims info
      app.buttons.$btnSideBarClaims.addClass("btn-main").removeClass("btn-light");
      app.buttons.$btnSideBarPolicy.removeClass("btn-main").addClass("btn-light");
      break;
    case 'btnClaimCancel':
      app.pages.$claimDeclaration.removeClass("active");
      app.pages.$policyWizard.addClass("active");
      break;

    case 'btnPrevClaimType':
      app.pages.$claimsSelection.removeClass("active");
      app.pages.$policyWizard.addClass("active");

      //  reset the select drop down
      app.dropdowns.selectClaimProcess.prop("selectedIndex", 0);

      //  Change the sidebar to policy
      app.buttons.$btnSideBarPolicy.addClass("btn-main").removeClass("btn-light");
      app.buttons.$btnSideBarClaims.removeClass("btn-main").addClass("btn-light");
      break;

    case 'btnNextClaimType':
      if (!app.data.selectedClaims.length) {
        app.modals.claimSelectionError.modal({ show: true });
      } else {
        app.pages.$claimsSelection.removeClass('active');
        app.pages.$personalInformation.addClass('active');
        showPersonalInfo();
        // Change the sidebar to personal info
        app.buttons.$btnSideBarPersonal.addClass("btn-main").removeClass("btn-light");
        app.buttons.$btnSideBarClaims.removeClass("btn-main").addClass("btn-light");
      }
      break;

    case 'btnComplete':
      $(this).prop("disabled", true);
      app.modals.completionSuccessModal.modal({ show: true });
      break;
    default:

  }

});

//  Listen for selection on policy wizard page
app.selectBoxes.$policyWizardSelectionBoxes.bind("click", function (e) {
  var selectedCoverValue = $(this).find('input').val();
  var allSelectBox = app.selectBoxes.$policyWizardSelectionBoxes;

  allSelectBox.find(".check-mark").addClass('d-lg-none');
  allSelectBox.removeClass("active");

  $(this)
    .addClass('active')
    .find(".check-mark")
    .removeClass('d-lg-none');
  
  app.data.selectedCover = selectedCoverValue;
});

//  Listen for selection on claims selection page

// $(document).off('click', app.selectBoxes.$claimsSelectionBoxes).on('click', app.selectBoxes.$claimsSelectionBoxes,function(e) {
app.selectBoxes.$claimsSelectionBoxes.unbind().bind("click", function (evt) {
  console.log("app.selectBoxes.$claimsSelectionBoxes");
  evt.stopPropagation();
  evt.preventDefault();
  var $ths = $(this);
  var selectedClaimValue = $ths.find('input').val();

  var $allClaimsBoxes = app.selectBoxes.$claimsSelectionBoxes;
  
  // $allClaimsBoxes
  //   .removeClass("active")
  //   .find(".check-mark").addClass("d-lg-none");

  //  TOGGLE checkmark on and off if already selected and remove from the claims list

  if( app.data.selectedClaims.indexOf(selectedClaimValue) >= 0) {
    app.data.selectedClaims.splice(app.data.selectedClaims.indexOf(selectedClaimValue), 1);

    $ths
      .removeClass('active')
      .find(".check-mark")
      .addClass('d-lg-none');
  } else {
    $ths
      .addClass('active')
      .find(".check-mark")
      .removeClass('d-lg-none');

    app.data.selectedClaims.push(selectedClaimValue);
  }
  
  console.log(app.data.selectedClaims);
});

app.dropdowns.selectClaimProcess.bind('change', function (e) {

  if (this.value && app.data.selectedCover) {
    console.log('Good to go');
    app.pages.$policyWizard.removeClass("active");
    app.pages.$claimDeclaration.addClass("active");

  } else {
    app.modals.policySelectionError.modal({
      show: true
    })
    //  Set the select box to blank state
    $(this).prop("selectedIndex", 0);
  }
});

function showPersonalInfo() {
  app.text.$txtPolicyCover.text( app.data.selectedCover );
  app.text.$txtClaimsSelected.text( app.data.selectedClaims );
}