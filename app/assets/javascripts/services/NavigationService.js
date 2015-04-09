/**
 * Created by Owen on 26/03/15.
 */
'use strict';

iuvare.factory('NavigationService', ['DEFAULT_VALUES', function(DEFAULT_VALUES){

    var _currentSection = undefined;
    var _currentSubSection = undefined;
    var _subsections = [];

    var getSubsectionsBySection = function (section) {
        var subsections = [];

        angular.forEach(DEFAULT_VALUES.SECTIONS, function(value, key){
            if(value.code == section){
                subsections = value.subsections;
            }
        });

        return subsections;
    };

    var getSectionByCode = function (sectionCode) {

        var currentSection = undefined;

        for(var sectionIndex=0; sectionIndex < DEFAULT_VALUES.SECTIONS.length; sectionIndex++){
            var section = DEFAULT_VALUES.SECTIONS[sectionIndex];
            if(section.code == sectionCode){
                currentSection = section;
                break;
            }
        }

        return currentSection;
    };

    var getCurrentSection = function(){
        return _currentSection;
    };

    var setCurrentSection = function (currentSection) {
        _currentSection = currentSection;
        _subsections = getSubsectionsBySection(currentSection);
    };

    var getSubsections = function(){
        return _subsections;
    };

    var setSubsections = function (subsections) {
        _subsections = subsections;
    }

    var getCurrentSubsection = function () {
        return _currentSubSection;
    };

    var getSubsectionByCode = function(subsections, subsectionCode){
        var currentSubsection = undefined;
        for(var subsectionIndex = 0; subsectionIndex<subsections.length; subsectionIndex++){
            var subsection = subsections[subsectionIndex];
            if(subsection.code == subsectionCode){
                currentSubsection = subsection;
                break;
            }
        }

        return currentSubsection;
    };

    return{
        getCurrentSection: getCurrentSection,
        setCurrentSection: setCurrentSection,
        getSubsections: getSubsections,
        setSubsections: setSubsections,
        getCurrentSubsection: getCurrentSubsection,
        getSubsectionByCode: getSubsectionByCode,
        getSectionByCode: getSectionByCode
    };

}]);
