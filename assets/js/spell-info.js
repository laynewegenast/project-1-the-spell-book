var spellNameEl = document.getElementById("spell-name");
var spellInfoEl = document.getElementById("spell-info");

// gets the spell name from url
var getSpellName = function () {
    var queryString = document.location.search;
    var spellName = queryString.split("=")[1];

    // check that there is a spell name
    if (spellName) {
        // call info fetch function
        getSpellInfo(spellName);
    } else {
        document.location.replace("./index.html");
    }
}

var getSpellInfo = function (spell) {
    var apiUrl = "https://www.dnd5eapi.co/api/spells/" + spell;
    fetch(apiUrl).then(function (response) {
        // success
        if (response.ok) {
            response.json().then(function (data) {
                // send the spell info to be displayed
                displaySpellInfo(data);
            });
        } else {
            document.location.replace("./index.html");
        }
    });
}

var displaySpellInfo = function (info) {
    spellNameEl.textContent = info.name;
    // make array to iterate through
    var spellInfo = Object.entries(info);

    // iterate through array
    for (var i = 0; i < spellInfo.length; i++) {
        // create elements to hold info name & info
        var infoContainer = document.createElement("div");
        var nameEl = document.createElement("span");
        var infoEl = document.createElement("p");
        // add classes to elements
        nameEl.classList="has-text-weight-bold";

        // switch case to fill content
        var array = spellInfo[i];
        var key = array[0];
        var value = array[1];

        // use switch case to check what to print
        switch (key) {
            case 'level':
                nameEl.textContent = "Level";
                infoEl.textContent = value;
                break;
            case 'classes':
                nameEl.textContent = "Class";
                var classes = [];
                for (var x = 0; x < value.length; x++) {
                    var y = value[x].name;
                    classes.push(y);
                }
                classes = classes.join(", ");
                infoEl.textContent = classes;
                break;
            case 'school':
                nameEl.textContent = "School";
                infoEl.textContent = value.name;
                break;
            case 'components':
                nameEl.textContent = "Components";
                infoEl.textContent = value.join(", ");
                break;
            case 'material':
                nameEl.textContent = "Material";
                infoEl.textContent = value;
                break;
            case 'casting_time':
                nameEl.textContent = "Casting Time";
                infoEl.textContent = value;
                break;
            case 'duration':
                nameEl.textContent = "Duration";
                infoEl.textContent = value;
                break;
            case 'concentration':
                nameEl.textContent = "Concentration";
                if (value) {
                    infoEl.textContent = "Yes";
                } else {
                    infoEl.textContent = "No";
                }
                break;
            case 'ritual':
                nameEl.textContent = "Ritual";
                if (value) {
                    infoEl.textContent = "Yes";
                } else {
                    infoEl.textContent = "No";
                }
                break;
            case 'attack_type':
                nameEl.textContent = "Attack Type";
                infoEl.textContent = value;
                break;
            case 'range':
                nameEl.textContent = "Range";
                infoEl.textContent = value;
                break;
            case 'dc':
                nameEl.textContent = "DC";
                var dcInfo = Object.entries(value);
                var dcType = Object.entries(dcInfo[0][1]);
                infoEl.textContent = dcType[1][1];
                break;
            case 'desc':
                nameEl.textContent = "Description";
                infoEl.textContent = value;
                break;
            case 'higher_level':
                if (value.length === 0) {
                    break;
                }
                nameEl.textContent = "At higher levels";
                infoEl.textContent = value;
                break;
            case 'damage':
                nameEl.textContent = "Damage";
                var damageInfo = Object.entries(value);
                var damageType = damageInfo[0];
                var damageName = damageType[1].name;
                var damageArr = damageInfo[1][1];
                var higherLevel = Object.entries(damageArr);
                console.log(higherLevel);
                var amountListEl = document.createElement("ul");
                for (var z = 0; z < higherLevel.length; z++) {
                    var currentArr = higherLevel[z];
                    var listItemEl = document.createElement("li");
                    listItemEl.textContent = "At " + currentArr[0] + ", " + currentArr[1] + " " + damageName + " damage.";
                    amountListEl.appendChild(listItemEl);
                }
                infoEl.appendChild(amountListEl);
                break;
            case 'heal_at_slot_level':
                nameEl.textContent = "Healing at Slot Level"
                var healInfo = Object.entries(value);
                var healListEl = document.createElement("ul");
                for (var a = 0; a < healInfo.length; a++) {
                    var thisLevel = healInfo[a];
                    var healListItem = document.createElement("li");
                    healListItem.textContent = "At level " + thisLevel[0] + ", " + thisLevel[1] + " healing.";
                    healListEl.appendChild(healListItem);
                }
                infoEl.appendChild(healListEl);
                break;
            default:
                break;
        }

        // append to dom
        infoContainer.appendChild(nameEl);
        infoContainer.appendChild(infoEl);
        spellInfoEl.appendChild(infoContainer);
    }
}


getSpellName();