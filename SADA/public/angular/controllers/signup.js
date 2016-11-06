(function(){

    angular.module("ngApp").controller("signupCtrl", signupController);

    function signupController(){

        this.error = false;
        this.isAlumno = null;
    }

})();
