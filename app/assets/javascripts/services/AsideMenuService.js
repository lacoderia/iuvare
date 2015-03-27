/**
 * Created by Owen on 26/03/15.
 */
'use strict';

iuvare.factory('AsideMenuService', ['DEFAULT_VALUES', function(DEFAULT_VALUES){

    var currentSection = undefined;

    var getCurrentSection = function(){
        return currentSection;
    };

    var setCurrentSection = function (currentSectionPosition) {
        currentSection = DEFAULT_VALUES.BUSINESS_SUBSECTIONS[currentSectionPosition];
    };

    return{
        getCurrentSection: getCurrentSection,
        setCurrentSection: setCurrentSection
    };

}]);
