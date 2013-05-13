/* 
Copyright (c) 2011-2012, M Rawash <mrawash@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

dactyl.assert(window.TabGroupsManager, "TabGroups Manager addon is not installed");

// Documentation
"use strict";
var INFO =
["plugin", {
        name: "tab-groups-manager",
        version: "0.5.1",
        href: "https://github.com/gwash/tab-groups-manager",
        summary: "TabGroups Manager addon integration",
        xmlns: "dactyl"
    },
    ["author", {email: "mrawash@gmail.com"}, "M Rawash"],
    ["license", {href: "http://www.gnu.org/licenses/gpl.html" }, "GPL"],
    ["project", {name: "Pentadactyl", "min-version": "1.0" }],
    ["p", {},
        "This plugin adds some commands and mappings for the ", ["link", 
        {topic: "https://addons.mozilla.org/firefox/addon/tabgroups-manager"}, "TabGroups Manager"],
        " addon."
    ],

    ["h3", {tag: "creating-tabgroups"}, "Creating TabGroups"],
    ["item", {},
        ["tags", {}, "vc :tgcr :tgcreate :tabgroupcr :tabgroupcreate"],
        ["spec", {}, ":tabgroupcr", ["oa", {}, "eate"], ["oa", {}, "name"]],
        ["spec", {}, "vc"],
        ["description", {},
            ["p", {},
                "Create a new TabGroup with ", ["oa", {}, "name"], ". If ", ["oa", {}, "!"], " is given, new ",
                "TabGroup will be focused."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "vo :tgop :tgopen :tgnew :tabgroupnew :tabgroupop :tabgroupopen"],
        ["spec", {},
             ":tabgroupop", ["oa", {}, "en"], ["oa", {}, "!"], ["oa", {}, "-name=", ["a", {}, "name]"]], ["oa", {}, "args"]
        ],
        ["spec", {}, "vo"],
        ["description", {},
            ["p", {},
                 "Similar to ", ["ex", {}, ":tabopen"], "but opens ", ["oa", {}, "args"], "in a new TabGroup ", 
                "with name ", ["a", {}, "name"], " if specified. If ", ["oa", {}, "!"], " is given, new TabGroup", 
                "will be focused."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "vO"],
        ["spec", {}, "vO"],
        ["description", {},
            ["p", {}, "Open a ", ["ex", {}, ":tabgroupopen"], " prompt followed by the current URL."]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgdu :tgduplicate :tabgroupdu :tabgroupduplicate"],
        ["spec", {}, ":", ["oa", {}, "count"], "tabgroupdu", ["oa", {}, "plicate"], ["oa", {}, "!"]],
        ["description", {},
            ["p", {},
                "Duplicates current TabGroup ", ["oa", {}, "count"], " times. The last duplicate", 
                "TabGroup is focused if ", ["oa", {}, "!"], " is provided."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tabdetachgtog :tabdetachgtogroup"],
        ["spec", {}, ":tabdetachgtog", ["oa", {}, "roup"], ["oa", {}, "!"], ["oa", {}, "name"]],
        ["description", {},
            ["p", {},
                "Detach the current tab, and open it in its own TabGroup with name ", 
                ["oa", {}, "name"], ", if supplied. If this is the last tab in a TabGroup, ",
                "the TabGroup will be closed."
            ],
            ["p", {},
                 "If ", ["oa", {}, "!"], " is added, the tab will be copied to a new TabGroup."
            ]
        ]
    ],
    
    ["h3", {tag: "navigating-tabgroups"}, "Navigating TabGroups"],
    ["item", {},
        ["tags", {}, "vv :tg :tgroup :tabg :tabgroup"],
        ["spec", {}, ":", ["oa", {}, "count"], "tabg", ["oa", {}, "roup"], ["oa", {}, "index|match"]],
        ["spec", {}, ["oa", {}, "count"], "vv"],
        ["description", {},
            ["p", {},
                "Go to the specified TabGroup from a list. Argument can be either a ",
                "TabGroup ", ["em", {}, "index"], ", ", ["em", {}, "match"], " or a ",
                ["link", {topic: "tabgroups-special-characters"}, "special charcters"], "."
            ],
            ["p", {},    
                 "If ", ["oa", {}, "count"], " is given, focus the ", ["oa", {}, "count"], "th TabGroup."
            ],
            ["p", {tag: "tabgroups-special-characters"},
                "Special charcters supported by all ",
                ["link", {topic: "tab-groups-manager-plugin"}, "tab-groups-manager"], " lists:"
            ],
            ["dl", {dt: "width: 6em;"},
                ["dt", {}, ["hl", {key: "Indicator"}, "%"]],
                    ["dd", {}, "The current TabGroup/tab, where indicated"],
                ["dt", {}, ["hl", {key: "Indicator"}, "#"]],
                    ["dd", {}, "The alternate TabGroup/tab, where indicated"],
                ["dt", {}, ["hl", {}, "^"]],
                    ["dd", {}, "First item in the list"],
                ["dt", {}, ["hl", {}, "$"]],
                    ["dd", {}, "Last item in the list"]
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "vV :tgls :tabgroups"],
        ["spec", {}, ":tabgroups ", ["oa", {}, "filter"]],
        ["spec", {}, "vV"],
        ["description", {},
            ["p", {},
                 "Show a list of TabGroups matching ", ["oa", {}, "filter"], ". Without", 
                ["oa", {}, "filter"], " list all TabGroups."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "v<Right> vh gv :tgn :tgnext :tabgroupn :tabgroupnext"],
        ["spec", {}, ":", ["oa", {}, "count"], "tabgroupn", ["oa", {}, "ext"], ["oa", {}, "!"]],
        ["spec", {}, ["oa", {}, "count"], "vh"],
        ["description", {},
            ["p", {},
                "Go to the next or ", ["oa", {}, "count"], "th ", ["em", {}, "active"], " TabGroup in the right ", 
                " direction. If ", ["oa", {}, "!"], " is provided ", ["em", {}, "suspended"], " groups will not be skipped."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "v<Left> vl gV :tgp :tgprevious :tabgroupp :tabgroupprevious"],
        ["spec", {}, ":", ["oa", {}, "count"], "tabgroupp", ["oa", {}, "revious"], ["oa", {}, "!"]],
        ["spec", {}, ["oa", {}, "count"], "vl"],
        ["description", {},
            ["p", {},
                "Go to the previous or ", ["oa", {}, "count"], "th ", ["em", {}, "active"], "TabGroup in thei ", 
                "left direction. If ", ["oa", {}, "!"], " is provided ", ["em", {}, "suspended"], " groups", 
                "will not be skipped."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "v<Up> vk v^ :tgf :tgfirst :tabgroupf :tabgroupfirst :tabgrouprewind"],
        ["spec", {}, ":tabgroupf", ["oa", {}, "irst"], ["oa", {}, "!"]],
        ["spec", {}, "vk"],
        ["description", {},
            ["p", {},
                "Go to the first ", ["em", {}, "active"], " TabGroup. If ", ["oa", {}, "!"], " is provided, go ",
                "to the first ", ["em", {}, "visible"], " TabGroup."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "v<Down> vj v$ :tgl :tglast :tabgroupl :tabgrouplast"],
        ["spec", {}, ":tabgroupl", ["oa", {}, "ast"], ["oa", {}, "!"]],
        ["spec", {}, "vj"],
        ["description", {},
            ["p", {},
                "Go to the last ", ["em", {}, "active"], " TabGroup. If ", ["oa", {}, "!"], " is provided, go ",
                "to the last ", ["em", {}, "visible"], " TabGroup."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "vb :tgb :tgbuffer :tabgroupb :tabgroupbuffer"],
        ["spec", {}, ":", ["oa", {}, "count"], "tabgroupb", ["oa", {}, "uffer"], ["oa", {}, "index|match"]],
        ["description", {},
            ["p", {},
                "Go to the specified TabGroup buffer from the buffer list. It takes the ",
                "same arguments as ", ["ex", {}, ":buffer"], " in addition to the ",
                ["link", {topic: "tabgroups-special-characters"}, "special charcters"],
                " available to all ", ["link", {topic: "tab-groups-manager-plugin"},
                 "tab-groups-manager"], "'s lists."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "vB :tgbls :tabgroupbuffers"],
        ["spec", {}, ":tabgroupbuffers ", ["oa", {}, "filter"]],
        ["spec", {}, "vB"],
        ["description", {},
            ["p", {},
                "Show a list of the current TabGroup buffers matching ", ["oa", {}, "filter"], ". ",
                "Without ", ["oa", {}, "filter"], " list all tabs in TabGroup."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tabgroupedb :tabgroupedbuffer"],
        ["spec", {}, ":tabgroupedb", ["oa", {}, "uffer"], ["oa", {}, "index|match"]],
        ["description", {},
            ["p", {},
                "Similar to ", ["ex", {}, ":tabgroupbuffer"], " but shows a list of all buffers, ",
                ["em", {}, "grouped"], " by ", ["em", {}, "visible"], " TabGroups."
            ],
            ["note", {},
                "This could be a complete replacement for ", ["ex", {}, ":buffer"], "."
            ],
            ["example", {},
                ["ex", {},
                    "nmap -d  'Switch to a grouped buffer' b :tabgroupedbuffer<Space>"
                ]
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tabgroupedbuffers"],
        ["spec", {}, ":tabgroupedbuffers ", ["oa", {}, "filter"]],
        ["description", {},
            ["p", {},
                "Show a list of all buffers matching ", ["oa", {}, "filter"], ".",
                "Without ", ["oa", {}, "filter"], " list all tabs grouped by TabGroups."
            ],
            ["example", {},
                ["ex", {},
                    "nmap -d 'Show a list of grouped buffers' B -ex :tabgroupedbuffers"
                ]
            ]
        ]
    ],
    
    ["h3", {tag: "reordering-tabgroups"}, "Reordering TabGroups"],
    ["item", {},
        ["tags", {}, ":tgm :tgmove :tabgroupm :tabgroupmove"],
        ["spec", {}, ":", ["oa", {}, "count"], "tabgroupm", ["oa", {}, "ove"], ["oa", {}, "index|match"]],
        ["spec", {}, ":", ["oa", {}, "count"], "tabgroupm", ["oa", {}, "ove"], ["oa", {}, "+N|-N"]],
        ["description", {},
            ["p", {},
                "Move the current TabGroup to the position of the TabGroup specified by ",
                "argument. ", ["oa", {}, "+N|-N"], " indicate a relative movement to the right or ",
                "left, wrapping around if hit either ends.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "v>"],
        ["spec", {}, ["oa", {}, "count"], "v>"],
        ["description", {},
            ["p", {},
                "Move the current TabGroup one or ", ["oa", {}, "count"], " spots in the right ",
                "direction.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "v<"],
        ["spec", {}, ["oa", {}, "count"], "v<"],
        ["description", {},
            ["p", {},
                "Move the current TabGroup one or ", ["oa", {}, "count"], " spots in the left",
                "direction.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgsort :tabgroupsort"],
        ["spec", {}, ":tabgroupsort"],
        ["description", {},
            ["p", {},
                "Case-sensitive sort of ", ["em", {}, "visible"], " TabGroups."
            ]
        ]
    ],

    ["h3", {tag: "deactivating-tabgroups"}, "Deactivating/Restoring TabGroups"],
    ["item", {},
        ["tags", {}, "vs :tgsu :tgsuspend :tabgroupsu :tabgroupsuspend"],
        ["spec", {}, ":tabgroupsu", ["oa", {}, "spend"], ["oa", {}, "index|match"]],
        ["spec", {}, "vs"],
        ["description", {},
            ["p", {},
                 "Suspend TabGroup specified by argument, or current if none was specified."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgunsu :tgunsuspend :tabgroupunsu :tabgroupunsuspend"],
        ["spec", {}, ":tabgroupunsu", ["oa", {}, "spend"], ["oa", {}, "!"], ["a", {}, "index|match"]],
        ["description", {},
            ["p", {},
                "Restore suspended TabGroup specified by argument. If ", ["oa", {}, "!"], " is ",
                "given, restored TabGroup will be selected. ",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "vS :tgsl :tgsleep :tabgroupsl :tabgroupsleep"],
        ["spec", {}, ":tabgroupsl", ["oa", {}, "eep"], ["oa", {}, "index|match"]],
        ["spec", {}, "vS"],
        ["description", {},
            ["p", {},
                 "Sleep TabGroup specified by argument, or current if none was specified."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgunsl :tgunsleep :tabgroupunsl :tabgroupunsleep"],
        ["spec", {}, ":tabgroupunsl", ["oa", {}, "eep"], ["oa", {}, "!"], ["a", {}, "index|match"]],
        ["description", {},
            ["p", {},
                "Restore sleeping TabGroup specified by argument. If ", ["oa", {}, "!"], " is given, ",
                "restored TabGroup will be selected.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "vd :tgde :tgdelete :tgcl :tgclose :tabgroupde :tabgroupdelete :tabgroupcl :tabgroupclose"],
        ["spec", {}, ":tabgroupde", ["oa", {}, "lete"], ["oa", {}, "!"], ["oa", {}, "index|match"]],
        ["spec", {}, "vd"],
        ["description", {},
            ["p", {},
                 "Delete TabGroup specified by argument, or current if none was specified."
            ],
            ["p", {},
                "If ", ["oa", {}, "!"], " is given, deleted TabGroup will not be saved to the closed ",
                "TabGroups list, which means it can't be ", ["em", {}, "restored"], " or seen later."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "vD"],
        ["spec", {}, "vD"],
        ["description", {},
            ["p", {},
                "Like ", ["k", {}, "vd"], " but selects TabGroup to the left of the deleted TabGroup ",
                "after deletion.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgunde :tgundelete :tguncl :tgunclose :tabgroupunde :tabgroupundelete :tabgroupuncl :tabgroupunclose"],
        ["spec", {}, ":tabgroupunsl", ["oa", {}, "eep"], ["oa", {}, "!"], ["a", {}, "index|match"]],
        ["description", {},
            ["p", {},
                "Restore closed TabGroup specified by argument. If ", ["oa", {}, "!"], " is given, ",
                "restored TabGroup will be selected.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgon :tgonly :tabgroupon :tabgrouponly"],
        ["spec", {}, ":tabgroupon", ["oa", {}, "ly"], ["oa", {}, "!"]],
        ["description", {},
            ["p", {},
                 "Sleep all TabGroups other than the one selected."
            ],
            ["p", {},
                "If ", ["oa", {}, "!"], " is added, it will ", ["em", {}, "close"], " all other TabGroups ",
                "instead.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "vu"],
        ["spec", {}, "vu"],
        ["description", {},
            ["p", {},
                 "Restore last closed TabGroup. "
            ],
            ["p", {},
                "Equivalent to ", ["ex", {}, ":tabgroupunclose ^"]
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, "vU :tgundo :tgres :tgrestore :tabgroupundo :tabgroupres :tabgrouprestore"],
        ["spec", {}, ":tabgroupres", ["oa", {}, "tore"], ["oa", {}, "!"], ["a", {}, "index|match"]],
        ["spec", {}, "vU"],
        ["description", {},
            ["p", {},
                "Restore any restorable TabGroup specified by argument. If ", ["oa", {}, "!"], " is ",
                "given, restored TabGroup will be selected.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tabgroupclear :tabgroupclearclosedlist"],
        ["spec", {}, ":tabgroupclear", ["oa", {}, "closedlist"]],
        ["description", {},
            ["p", {},
                "Clear ", ["em", {}, "closed"], " TabGroups list."
            ]
        ]
    ],
    
    ["h3", {tag: "tabgroups-actions"}, "TabGroups Actions"],
    ["item", {},
        ["tags", {}, "vr :tgrel :tgreload :tabgrouprel :tabgroupreload"],
        ["spec", {}, ":tabgrouprel", ["oa", {}, "oad"], ["oa", {}, "index|match"]],
        ["spec", {}, "vr"],
        ["description", {},
            ["p", {},
                "Reload all tabs in the specified TabGroup, or the current TabGroup if ",
                "none was specified.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgren :tgrename :tabgroupren :tabgrouprename"],
        ["spec", {}, ":tabgroupren", ["oa", {}, "ame"], ["oa", {}, "!"], ["oa", {}, "-tabgroup=", ["a", {}, "index|match"]], ["oa", {}, "name"]],
        ["description", {},
            ["p", {},
                "Rename current TabGroup, or the one specified by ", ["em", {}, "-tabgroup"], " (short",
                "name: ", ["em", {}, "-tg"], "), to ", ["oa", {}, "name"], "."
            ],
            ["p", {},
                "If ", ["oa", {}, "!"], " is added and ", ["oa", {}, "name"], " was not given, it'll auto rename ",
                "the specified TabGroup according to its currently selected tab.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgbmark :tabgroupbo tabgroupbookmark"],
        ["spec", {}, ":tabgroupbo", ["oa", {}, "okmark"], ["oa", {}, "-name=", ["a", {}, "name"]], ["oa", {}, "index|match"]],
        ["description", {},
            ["p", {},
                "Bookmark all tabs in TabGroup in a single folder named ", ["oa", {}, "-name"], " if ",
                "provided, or TabGroup's name, otherwise.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgbmarkall :tabgroupbookmarka tabgroupbookmarkall"],
        ["spec", {}, ":tabgroupbookmarka", ["oa", {}, "ll"], ["oa", {}, "-name=", ["a", {}, "name"]], ["oa", {}, "-type=", ["a", {}, "type"]]],
        ["description", {},
            ["p", {},
                "Bookmark all TabGroups of type ", ["oa", {}, "-type"], " (short name: ", ["em", {}, "-t"], ") or ",
                ["em", {}, "visible"], " TabGroups otherwise, in a folder with name ", ["oa", {}, "-name"],
                " or one based on TabGroups type and current date."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgdo :tabgroupdo"],
        ["spec", {}, ":tabgroupdo", ["oa", {}, "!"], ["a", {}, "cmd"]],
        ["description", {},
            ["p", {},
                "Execute ", ["a", {}, "cmd"], " once in each ", ["em", {}, "active"], " TabGroup. Each TabGroup ",
                "is focused, in turn, and ", ["a", {}, "cmd"], " is executed therin. The last TabGroup ",
                "remains focused after execution.",
            ],
            ["p", {},
                "If ", ["oa", {}, "!"], " is added, it'll execute in all ", ["em", {}, "visible"], " TabGroups. ",
                "Restoring suspended TabGroups in the process.",
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tabattachgtog :tabattachgtogroup"],
        ["spec", {}, ":tabattachgtog", ["oa", {}, "roup"], ["oa", {}, "!"], ["a", {}, "index|match"]],
        ["description", {},
            ["p", {},
                "Attach the current tab to the specified TabGroup. If this is the last ",
                "tab in a TabGroup, the TabGroup will be closed.",
            ],
            ["p", {},
                "If ", ["oa", {}, "!"], " is added, the tab will be copied rather than moved."
            ]
        ]
    ],
    ["item", {},
        ["tags", {}, ":tgbar :tabgroupbartoggle"],
        ["spec", {}, ":tabgroupbartoggle"],
        ["description", {},
            ["p", {},
                 "Toggle display of TabGroups bar."
            ]
        ]
    ],

    ["h3", {tag: "tabgroups-options"}, "Options"],
    ["item", {},
        ["tags", {}, "'tgshowindicator' 'tabgroupshowindicator'"],
        ["strut"],
        ["spec", {}, "'tabgroupshowindicator' 'tgshowindicator'"],
        ["type", {}, "boolean"],
        ["default", {}, "false"],
        ["description", {},
            ["p", {},
                 "Whether to show indicators in TabGroup lists."
            ]
        ]
    ]
];

// Globals
TGM = window.TabGroupsManager
TGMAPI = window.TabGroupsManagerApiVer1
allGroups = TGM.allGroups
closedGroups = TGM.closedGroups
sleepingGroups = TGM.sleepingGroups
alternateGroup = null
lastFilter = ""

// Functions
function selectedGroup() {
    return allGroups.selectedGroup
}

function selectedIndex() {
    return allGroups.groupbar.selectedIndex
}

function groupCount() {
    return allGroups.childNodes.length
}

function updateStatusline() {
    if (dactyl.has("tabs")) {
        let g = selectedGroup()
        let tabCountWidget = document.getElementById("dactyl-statusline-field-tabcount")
        tabCountWidget.value =
            "[" + (getGroupTabIndex(g.selectedTab)+1) + "/" + g.displayTabCount + "] " +
                 g.name + "(" + (selectedIndex()+1) + "/" + groupCount() + ")"
    }
}

function getGroupIndex(group, type) {
    let groups = getGroups(type)
    if (group && groups)
        for (var i = 0; i < groups.length; i++) {
            if (groups[i] == group)
                return i
        }
    return -1
}

function getGroups(type) {
    let groups = []
    if (!type || type=="Visible")
        for (var i = 0; i < groupCount(); i++)
            groups.push(allGroups.childNodes[i].group)
    else if (type=="Active")
        groups = allGroups.makeNonSuspendedGroupsList()
    else if (type=="Suspended")
        for (var i = 0; i < groupCount(); i++) {
            if (allGroups.childNodes[i].group.suspended)
                groups.push(allGroups.childNodes[i].group)
        }
    else if (type=="Sleeping")
        groups = groups.concat(sleepingGroups.store)
    else if (type=="Closed")
        groups = groups.concat(closedGroups.store)
    else if (type=="Restorable")
        groups = Array.concat(getGroups("Suspended"), getGroups("Sleeping"), getGroups("Closed"))
    return groups
}

function getGroupByName(name, type) {
    lastFilter = name
    let groups = getGroups(type)
    
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].name.match(name))
            return groups[i]
    }
    return dactyl.echoerr("E: No TabGroup with name '" + name + "' was found!")
}

function getGroupByIndex(index, type) {
    let groups = getGroups(type)
    if (index < 1 || index > groups.length)
        return dactyl.echoerr("E: " + index + " is out of range!")
    return groups[index-1]
}

function getGroupByArgs(arg, type) {
    arg = arg && arg.replace(/^(\d+):.*/, "$1")

    if (!arg || arg == "" || arg == "%")
        return selectedGroup()
    else if (arg == "#")
        return alternateGroup
    else if (arg == "^" || arg == "0")
        return getGroups(type).shift()
    else if (arg == "$")
        return getGroups(type).pop()
    else if (typeof arg == "object")
        return arg
    else if (typeof arg == "number" || /^\d+$/.test(arg))
        return getGroupByIndex(arg, type)
    else
        return getGroupByName(arg, type)
    return null
}

function getNextGroup(count, type) {
    let groups = getGroups(type)
    let index = (getGroupIndex(selectedGroup(), type) + (count || 1)) % groups.length

    return groups[index]
}

function getPrevGroup(count, type) {
    let groups = getGroups(type)
    let index = (getGroupIndex(selectedGroup(), type) - (count || 1)) % groups.length

    index+=(index<0 ? groups.length : 0)

    return groups[index]
}

function getGroupTabCount(group) {
    let count = group && group.displayTabCount || group.tabs && group.tabs.length
    if(count)
        return count.toString().replace(/^(\d)$/,"0$1")
    return -1
}

function getGroupTabIndex(tab) {
    if(tab)
        return TGMAPI.getIndexInGroupFromTab(tab)
    return -1
}

function selectGroup(group) {
    if (!group || group==selectedGroup())
        return
    
    alternateGroup = selectedGroup()
    group.setSelected()
    updateStatusline()
}

function createGroup(urls, name, act) {
    let tab = null
    let group = null
     
    if (urls.length > 0)
        tab = TGM.overrideMethod.gBrowserAddTab(urls[0])

    group = allGroups.openNewGroup(tab, null, name)
     
    if (act)
        selectGroup(group)

    for (var i = 1; i < urls.length; i++) {
        let tab = TGM.overrideMethod.gBrowserAddTab(urls[i])
        group.addTab(tab)
    }
    
    dactyl.echomsg("Created TabGroup with name '" + group.name + "'")
    updateStatusline()
}

//XXX
function getGroupTabs(group) {
    group = group || selectedGroup()
    let gtabs = []
    
    if (group.suspendArray || group.tabs) {
        let _tabs = group.suspendArray || group.tabs
        
        for (let i = 0; i < _tabs.length; i++) {
            let t = []
            
            t.tab = _tabs[i]
            
            let tabData = JSON.parse(t.tab)
            t.title = tabData.entries[tabData.index-1].title
            t.url = tabData.entries[tabData.index-1].url
            t.urispec = TGM.utils.createNewNsiUri(t.url)
            t.id = tabData.entries[tabData.index-1].ID 
            t.icon = tabData.attributes.image 

            gtabs.push(t)
        }

    } else if (group.tabArray) {
        for (let i = 0; i < group.tabArray.length; i++) {
            let t = []

            t.tab = group.tabArray[i]
            
            t.title = t.tab.linkedBrowser.contentDocument.title || t.tab.label
            t.url = t.tab.linkedBrowser.contentDocument.location.href
            t.urispec = t.tab.linkedBrowser.currentURI
            t.id = t.tab._tPos+1
            t.icon = t.tab.image
        
            gtabs.push(t)
        }
    }

    return gtabs 
}

function getGroupTabByArg(arg, gtabs) {
    gtabs = gtabs || getGroupTabs(selectedGroup())

    arg = arg && arg.replace(/^(\d+):.*/, "$1")

    if (!arg || arg == "" || arg == "%")
        return gBrowser.mCurrentTab
    else if (arg == "#")
        return tabs.alternate
    else if (arg == "^" || arg == "0")
        return gtabs.shift().tab
    else if (arg == "$")
        return gtabs.pop().tab
    else if (typeof arg == "number" || /^\d+$/.test(arg))
        return gtabs[parseInt(arg)-1].tab
    else if (typeof arg == "string")
        for (let i in gtabs)
            if (gtabs[i].title.match(arg) || gtabs[i].url.match(arg))
                return gtabs[i].tab
    return null

}

function bookmarkGroup(group, name, parentFolder) {
    let bmsvc = Cc["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Ci.nsINavBookmarksService)
    
    name = name || group.name
    parentFolder = parentFolder || bmsvc.bookmarksMenuFolder
    
    let index = bmsvc.DEFAULT_INDEX
    let folder = bmsvc.createFolder(parentFolder, name, index)
    let tabs = getGroupTabs(group)

    for (let i in tabs) {
        try {
           bmsvc.insertBookmark(folder, tabs[i].urispec, index, tabs[i].title)
        } catch (e) {
            dactyl.echoerr(e.messsage)
        }
    }
    
}

function bookmarkGroups(type, name) {
    name = name || (type ? type+" " : "") + "TabGroups (" + Date() + ")"
    
    let bmsvc = Cc["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Ci.nsINavBookmarksService)
    let parentFolder = bmsvc.bookmarksMenuFolder
    let index = bmsvc.DEFAULT_INDEX
    let folder = bmsvc.createFolder(parentFolder, name, index)
    let groups = getGroups(type)

    for (let i in groups)
        bookmarkGroup(groups[i], null, folder)
    
}

function getGroupIcon(group) {
    return (group.image!="") ? group.image :
        group.selectedTab ? group.selectedTab.image : ""
}

function getGroupCommand(id, type) {
    let cmd = "top.TabGroupsManager.allGroups.getGroupById("+id+").setSelected()"

    if (type == "Sleeping")
        cmd ="top.TabGroupsManager.sleepingGroups.restoreGroup("+id+");"+cmd
    else if (type == "Closed")
        cmd+="top.TabGroupsManager.closedGroups.restoreGroup("+id+");"+cmd

    return cmd
}

//TODO better handling of inactive groups text
function getGroupDescription(group, type) {
    let text = group.name

    if (group.selectedTab)
        text = group.selectedTab.label
    else if (group.suspendTitleList)
        text = "(suspended) " + group.suspendTitleList.replace(/^\s*$/, group.name)
    else if (group.titleList)
        text = group.titleList.replace(/^\s*$/, group.name)

    return  [["span", {}, "[", getGroupTabCount(group), "] "],
            ["span", {highlight: "URL", onclick: getGroupCommand(group.id, type)}, text]]
}

// Completion
function groupCompletion(context, args, type, caption, offset) {
    caption = caption || (type ? type+" " : "") + "TabGroup"
    type = type || "Visible"
    offset = offset || 1

    let items = []
    let groups = getGroups(type)
    
    let filter = context.filter.toLowerCase()
    context.anchored = false
    context.compare = CompletionContext.Sort.number
    context.title = [caption, "[Length] Tab(s)"]
    context.keys = {
        text: "text",
        description: "description",
        icon: "icon",
    }
    
    if (options["tabgroupshowindicator"] && (type == "Visible" || type == "Active"))
        context.pushProcessor(0, function (item, text, next) [
            ["span", {highlight:"Indicator", style:"display: inline-block;"} , item.item.indicator],
            next.call(this, item, text)
            ]
        )
    
    for (var i = 0; i < groups.length; i++) {
        let g = groups[i]
        let indicator = (g==selectedGroup()) ? "%" : (g==alternateGroup) ? "#" : ""

        items.push({
            text: i+offset + ": " + (g.name || "(noname)"),
            description: getGroupDescription(g, type),
            indicator: indicator,
            icon: getGroupIcon(g),
        });
     }

    context.completions = items
}

//TODO commands for inactive tabs
function groupTabCompletion(context, args, group, caption, offset) {
    let filter = context.filter.toLowerCase()

    context.anchored = false
    context.compare = CompletionContext.Sort.number
    context.filters[0] = CompletionContext.Filter.textDescription
    context.title = [caption || "TabGroup Buffers"]
    context.keys = {
        text: "text",
        description: "url",
        icon: "icon",
        id: "id",
        command: function () "tabs.select"
    }
    
    context.pushProcessor(0, function (item, text, next) [
        ["span", {highlight:"Indicator", style:"display: inline-block;"}, item.item.indicator],
        next.call(this, item, text)
        ]
    )

    context.process[1] = function (item, text)
        template.bookmarkDescription(item, template.highlightFilter(text, this.filter)
    )

    let tabArray = getGroupTabs(group || selectedGroup())
    let items = []
    offset = offset || 1
    
    for (var i = 0; i < tabArray.length; i++) {
        let tab = tabArray[i]
        let indicator = ""
    
        if (tab.tab == gBrowser.mCurrentTab)
           indicator = "%"
        else if (tab.tab == tabs.alternate)
           indicator = "#"
    
        items.push({
            text: [
                i+offset + ": " + (tab.title || "(Untitled)"),
                i+offset + ": " + tab.url
            ],
            url: tab.url,
            indicator: indicator,
            icon: tab.icon || BookmarkCache.DEFAULT_FAVICON,
            id: tab.id,
        })
    }
    
    context.completions = items
}

function groupedTabCompletion(context, args) {
    let groups = getGroups("Active")
    let offset = 1
    for (let i = 0; i < groups.length; i++) {
        let g = groups[i]
        let title = [["span", {highlight:"CompIcon"}, ["img", {src: getGroupIcon(g)}]], (g.name || "(noname)")]

        context.fork(g.id, 0, this, function (context, args)
            groupTabCompletion(context, args, g, title, offset)
        )
        offset+=groups[i].tabArray.length
    }
}

function showGroups(filter) {
    completion.listCompleter(groupCompletion, filter)
}

function showGroupTabs(filter) {
    completion.listCompleter(groupTabCompletion, filter)
}

function showGroupedTabs(filter) {
    completion.listCompleter(groupedTabCompletion, filter)
}

// Commands
group.commands.add(["tabg[roup]", "tg[roup]"], "Switch to a TabGroup",
    function (args) {
        selectGroup(getGroupByArgs(args.count || args.literalArg))
    }, {
        argCount: "?",
        literal: 0,
        count: true,
        completer: groupCompletion,
    }
)

group.commands.add(["tabgroups", "tgls"], "Show a list of TabGroups",
    function (args) {
        showGroups(args.literalArg)
    }, {
        argCount: "?",
        literal: 0
    }
)

group.commands.add(["tabgroupn[ext]", "tgn[ext]"], "Switch to the next TabGroup",
    function (args) {
        selectGroup(getNextGroup(args.count, args.bang ? "Visible" : "Active"))
    }, {
        argCount: "0",
        count: true
    }
)

group.commands.add(["tabgroupp[revious]", "tgp[revious]"], "Switch to the previous TabGroup",
    function (args) {
        selectGroup(getPrevGroup(args.count, args.bang ? "Visible" : "Active"))
    }, {
        argCount: "0",
        count: true,
        bang: true
    }
)

group.commands.add(["tabgroupf[irst]", "tabgrouprew[ind]", "tgf[irst]"], "Switch to the first TabGroup",
    function (args){
        selectGroup(getGroupByArgs("^", args.bang ? "Visible" : "Active"))
    }, {
        argCount: "0",
        bang: true
    }
)

group.commands.add(["tabgroupl[ast]", "tgl[ast]"], "Switch to the last TabGroup",
    function (args){
        selectGroup(getGroupByArgs("$", args.bang ? "Visible" : "Active"))
    }, {
        argCount: "0",
        bang: true
    }
)

group.commands.add(["tabgroupcr[eate]", "tgcr[eate]"], "Create a new TabGroup",
    function (args) {
        createGroup([], args.literalArg, args.bang)
    }, {
        argCount: "?",
        literal: 0,
        bang: true,
    }
)

group.commands.add(["tabgroupop[en]", "tabgroupnew", "tgop[en]", "tgnew"], "Open one or more URLs in a new TabGroup",
    function (args) {
        let urls = dactyl.parseURLs(args.literalArg)
        let name = args["-name"]

        createGroup(urls, name, args.bang)
    }, {
        literal: 0,
        bang: true,
        completer: function (context) completion.url(context),
        domains: function (args) commands.get("open").domains(args),
        privateData: true,
        options: [{
            names: ["-name", "-n"],
            description: "Name of the new TabGroup",
            type: CommandOption.STRING
        }]
    }
)

group.commands.add(["tabgrouprel[oad]", "tgrel[oad]"], "Reload TabGroup",
    function (args) {
        getGroupByArgs(args.literalArg).reloadTabsInGroup()
    }, {
        argCount: "?",
        completer: groupCompletion,
        literal: 0
    }
)

group.commands.add(["tabgroupm[ove]", "tgm[ove]"], "Move the current TabGroup",
    function (args) {
        let count = args.count
        let arg = args.literalArg
        let pos = selectedIndex()

        if (count)
            pos = count
        else if (/^[-+]\d+$/.test(arg))
            pos += parseInt(arg) % groupCount()
        else if (/^\d+$/.test(arg) && parseInt(arg) > 1)
            pos = parseInt(arg-1)
        else
            pos = getGroupIndex(getGroupByArgs(arg))
         
        if (pos >= groupCount())
            pos = groupCount()-1
        else if (pos < 0)
            pos+=groupCount()
        
        allGroups.changeGroupOrder(selectedGroup(), pos)
        updateStatusline()
    }, {
        argCount: "?",
        count: true,
        completer: groupCompletion,
        literal: 0
    }
)

group.commands.add(["tabgroupren[ame]", "tgren[ame]"], "Rename TabGroup",
    function (args) {
        let name = args.literalArg
        let group = getGroupByArgs(args["-tabgroup"])

        if (!name && args.bang)
            group.autoRenameNameOnly()
        else if (name)
            group.setName(name)
        
        if (name && group.name!=name)
            return dactyl.echoerr("E: failed to rename TabGroup")

        updateStatusline()
    }, {
        argCount: "?",
        bang: true,
        literal: 0,
        options: [{
            names: ["-tabgroup", "-tg"],
            description: "TabGroup to rename, default is current",
            type: CommandOption.STRING,
            completer: groupCompletion
        }]
    }
)

group.commands.add(["tabgroupsu[spend]", "tgsu[spend]"], "Suspend matching TabGroup",
    function (args) {
        let group = getGroupByArgs(args.literalArg, "Active")
        
        if (!group)
            return
        else
            group.suspendGroup()

        dactyl.echomsg("Suspended TabGroup with name '" + group.name + "'", 2)
        updateStatusline()
    }, {
        argCount: "?",
        completer: function (context, args) groupCompletion(context, args, "Active"),
        literal: 0,
    }
)

group.commands.add(["tabgroupunsu[spend]", "tgunsu[spend]"], "Restore suspended TabGroup",
    function (args) {
        let group = getGroupByArgs(args.literalArg, "Suspended")
        
        if (!group)
            return
        else
            group.unsuspendGroup()
         
        if (args.bang)
            selectGroup(group)
        else
            dactyl.echomsg("Restored TabGroup with name '" + group.name + "'")
        
        updateStatusline()
    }, {
        argCount: "?",
        bang: true,
        completer: function (context, args) groupCompletion(context, args, "Suspended"),
        literal: 0,
    }
)

group.commands.add(["tabgroupsl[eep]", "tgsl[eep]"], "Sleep matching TabGroup",
    function (args) {
        getGroupByArgs(args.literalArg).sleepGroup()
    }, {
        argCount: "?",
        completer: groupCompletion,
        literal: 0
    }
)

group.commands.add(["tabgroupunsl[eep]", "tgunsl[eep]"], "Restore sleeping TabGroup",
    function (args) {
        let group = getGroupByArgs(args.literalArg, "Sleeping")
        
        if (!group)
            return
        else
            sleepingGroups.restoreGroup(group.id)

        if (args.bang)
            selectGroup(allGroups.getGroupById(group.id))
        else
            dactyl.echomsg("Restored TabGroup with name '" + group.name + "'")
        
        updateStatusline()
    }, {
        argCount: "1",
        bang: true,
        completer: function (context, args) groupCompletion(context, args, "Sleeping"),
        literal: 0
    }
)

group.commands.add(["tabgroupde[lete]", "tabgroupcl[ose]", "tgde[lete]", "tgcl[ose]"], "Delete matching TabGroup",
    function (args) {
        let group = getGroupByArgs(args.literalArg) 
        
        if (!group)
            return
        else if (args.bang)
            group.close()
        else
            group.closeAllTabsAndGroup()
        
        dactyl.echomsg("Closed TabGroup with name '" + group.name + "'", 2)
        updateStatusline()
    }, {
        argCount: "?",
        bang: true,
        completer: groupCompletion,
        literal: 0
    }
)

group.commands.add(["tabgroupunde[lete]", "tabgroupuncl[ose]", "tgunde[lete]","tguncl[ose]"], "Restore closed TabGroup",
    function (args) {
        let group = getGroupByArgs(args.literalArg, "Closed")

        if (!group)
            return
        else
            closedGroups.restoreGroup(group.id)
        
        if (args.bang)
            selectGroup(allGroups.getGroupById(group.id))
        else
            dactyl.echomsg("Restored TabGroup with name '" + group.name + "'")
        
        updateStatusline()
    }, {
        argCount: "1",
        bang: true,
        completer: function (context, args) groupCompletion(context, args, "Closed"),
        literal: 0
    }
)

group.commands.add(["tabgroupundo", "tgundo", "tabgroupres[tore]", "tgres[tore]"], "Restore TabGroup",
    function (args){
        let group = getGroupByArgs(args.literalArg, "Restorable")

        if (!group)
            return
        else if (allGroups.getGroupById(group.id))
            group.unsuspendGroup()
        else if (sleepingGroups.getGroupById(group.id))
            sleepingGroups.restoreGroup(group.id)
        else if (closedGroups.getGroupById(group.id))
            closedGroups.restoreGroup(group.id)
        else
            return
        
        if (args.bang)
            selectGroup(allGroups.getGroupById(group.id))
        else
            dactyl.echomsg("Restored TabGroup with name '" + group.name + "'")
        
        updateStatusline()
    }, {
        argCount: "1",
        bang: true,
        completer: function (context, args) {
            let types = ["Suspended", "Sleeping", "Closed"]
            let offset = 1
            for (let i in types) {
                context.fork(types[i], 0, this, function (context, args)
                    groupCompletion(context, args, types[i], null, offset)
                )
                offset+=getGroups(types[i]).length
            }
        },
        literal: 0
    }
)

group.commands.add(["tabgroupon[ly]", "tgon[ly]"], "Sleep or close all other TabGroups",
    function (args) {
        let groups = getGroups()
        let group = selectedGroup()
        
        for (let i = 0; i < groups.length; i++)
             if (groups[i]!=group)
                if (args.bang)
                     groups[i].closeAllTabsAndGroup()
                else
                    groups[i].sleepGroup()
        
        if (args.bang)
            dactyl.echomsg("Closed all other TabGroups", 2)
        else
            dactyl.echomsg("Sent all other TabGroups to sleep", 2)

        updateStatusline()
    }, {
        argCount: "0",
        bang: true,
        literal: 0
    }
)

group.commands.add(["tabgroupdu[plicate]", "tgdu[plicate]"], "Duplicate current TabGroup",
    function (args) {
        let count = args.count || 1
        let group

        while (count > 0) {
            group = selectedGroup().duplicateGroup()
            count--
        }

        if (args.bang)
            selectGroup(group)
    }, {
        argCount: "0",
        count: true,
        bang: true
    }
)

//TODO sort options
group.commands.add(["tabgroupsort", "tgsort"], "Sort TabGroups",
    function () {
        for (var i=1; i<=groupCount(); i++)
            for (var j=i; j<=groupCount(); j++)
                if (getGroupByIndex(i).name > getGroupByIndex(j).name)
                    allGroups.changeGroupOrder(getGroupByIndex(i), j-1)
        updateStatusline()
    }, {
        argCount: "0"
    }
)

group.commands.add(["tabgroupbo[okmark]", "tgbmark"], "Bookmark TabGroup",
    function (args){
        let group = getGroupByArgs(args.literalArg)
        
        bookmarkGroup(group, args["-name"])
        dactyl.echomsg("Bookmarked all tabs in '"+group.name+"'") 
    }, {
        argCount: "?",
        completer: groupCompletion,
        literal: 0,
        options: [{
            names: ["-name", "-n"],
            description: "Name of the bookmark folder",
            type: CommandOption.STRING
        }]
    }
)

group.commands.add(["tabgroupbookmarka[ll]", "tgbmarkall"], "Bookmark all TabGroups",
    function (args) {
        let type = args["-type"] || "Visible"
        bookmarkGroups(type, args["-name"])
        dactyl.echomsg("Bookmarked all "+type+" TabGroups") 

    }, {
        argCount: "?",
        literal: 0,
        options: [{
            names: ["-name", "-n"],
            description: "Name of the bookmark folder",
            type: CommandOption.STRING
        }, {
            names: ["-type", "-t"],
            description: "Type of TabGroups to bookmark",
            type: CommandOption.STRING,
            completer: [["Visible", "Visible TabGroups (default)"],
                    ["Active", "Active TabGroups"],
                    ["Suspended", "Suspended TabGroups"],
                    ["Sleeping", "Sleeping TabGroups"],
                    ["Closed", "Closed TabGroups"]]
        }]
    }
)

group.commands.add(["tabgroupdo", "tgdo"], "Execute a command in each TabGroup",
    function (args) {
        let groups = getGroups(args.bang ? "Visible" : "Active")
        for (let i = 0; i < groups.length; i++) {
            selectGroup(groups[i])
            dactyl.execute(args.string, null, true)
        }
    }, {
        argCount: "+",
        bang: true,
        completer: function (context) completion.command(context)
    }
)

group.commands.add(["tabgroupclear[closedlist]"], "Clear closed TabGroups list",
    function () {
        closedGroups.clear()
    }, {
        argCount: "0"
    }
)

group.commands.add(["tabgroupb[uffer]", "tgb[uffer]"], "Switch to a buffer in TabGroup",
    function (args) {
        let group = selectedGroup()
        let tab = getGroupTabByArg(args.literalArg, getGroupTabs(group)) 

        if (!tab)
            return dactyl.echoerr("No matching Buffer for "+args.literalArg)

        tabs.select(tab)
        updateStatusline()
    }, {
        argCount: "?",
        literal: 0,
        count: true,
        completer: groupTabCompletion,
    }
)

group.commands.add(["tabgroupbuffers", "tgbls"], "Show a list of TabGroup buffers",
    function (args) {
        showGroupTabs(args.literalArg)
    }, {
        argCount: "?",
        literal: 0
    }
)

group.commands.add(["tabgroupedb[uffer]"], "Switch to a grouped buffer",
    function (args) {
        let gtabs = []
        let groups = getGroups("Active")
        
        for (let i = 0; i < groups.length; i++)
            gtabs = gtabs.concat(getGroupTabs(groups[i]))

        let tab = getGroupTabByArg(args.literalArg, gtabs)
        
        if (!tab)
            return dactyl.echoerr("No matching Buffer for "+args.literalArg)

        tabs.select(tab)
        updateStatusline()
    }, {
        argCount: "?",
        completer: groupedTabCompletion,
        literal: 0,
    }
)

group.commands.add(["tabgroupedbuffers"], "Show a list of grouped buffers",
    function (args) {
        showGroupedTabs(args.literalArg)
    }, {
        argCount: "?",
        literal: 0
    }
)

//TODO switch for attaching to "Sleeping" groups
group.commands.add(["tabattachtog[roup]"], "Attach the current tab to another TabGroup",
    function (args) {
        let group = getGroupByArgs(args.literalArg)
        
        if (!group) return

        allGroups.moveTabToGroupInSameWindow(gBrowser.mCurrentTab, group, args.bang)
        updateStatusline()
    },
    {
        argCount: "?",
        bang: true,
        completer: groupCompletion,
        literal: 0
    }
)

group.commands.add(["tabdetachtog[roup]"], "Detach current tab to its own TabGroup",
    function (args) {
        let name = args.literalArg 
        let group = null

        if (name)
            group = allGroups.openNewGroupCore(null, name)
        
        allGroups.moveTabToGroupInSameWindow(gBrowser.mCurrentTab, group, args.bang)
        updateStatusline()
    }, {
        argCount: "?",
        bang: true,
        literal: 0
    }
)

group.commands.add(["tabgroupbartoggle", "tgbar"], "Toogle TabGroup bar",
    function () {
        TGM.groupBarDispHide.toggleDispGroupBar()
    }, {
        argCount: "0"
    }
)

// Mappings
group.mappings.add([modes.NORMAL], ["vo"],
    "Open one or more URLs in a new TabGroup",
    function () CommandExMode().open("tabgroupopen ") 
)

group.mappings.add([modes.NORMAL], ["vO"],
    "Open one or more URLs in a new TabGroup, based on current location",
    function () CommandExMode().open("tabgroupopen " + buffer.URL)
)

group.mappings.add([modes.NORMAL], ["vv"],
    "Switch to a TabGroup",
    function ({count}) {
        if (count > 0)
            selectGroup(getGroupByIndex(count))
        else
            CommandExMode().open("tabgroup ")
    }, { count: true }
)

group.mappings.add([modes.NORMAL], ["vV"],
    "Show a list of TabGroups",
    function () showGroups("")
)

group.mappings.add([modes.NORMAL], ["vb"],
    "Switch to a buffer in TabGroup",
    function ({count}) {
        if (count > 0)
            selectedGroup.selectNthTabInGroup(count+1)
        else
            CommandExMode().open("tabgroupbuffer ")
    }, { count: true }
)

group.mappings.add([modes.NORMAL], ["vB"],
    "Show a list of TabGroup buffers",
    function () showGroupTabs("")
)

group.mappings.add([modes.NORMAL], ["vr"],
    "Reload TabGroup",
    function () selectedGroup().reloadTabsInGroup()
)

group.mappings.add([modes.NORMAL], ["vc"],
    "Create a new TabGroup",
    function () CommandExMode().open("tabgroupcreate ")
)

group.mappings.add([modes.NORMAL], ["vd"],
    "Delete current TabGroup",
    function () selectedGroup().closeAllTabsAndGroup()
)

group.mappings.add([modes.NORMAL], ["vD"],
    "Delete current TabGroup, focus tabgroup to the left",
    function () {
        let group = selectedGroup()
        selectGroup(getPrevGroup(1, "Active"))
        group.closeAllTabsAndGroup()
    }
)

group.mappings.add([modes.NORMAL], ["vs"],
    "Suspend current TabGroup",
    function () selectedGroup().suspendGroup()
)

group.mappings.add([modes.NORMAL], ["vS"],
    "Sleep current TabGroup",
    function () selectedGroup().sleepGroup()
)

group.mappings.add([modes.NORMAL], ["vu"],
    "Undo closing of a TabGroup",
    function () {
            closedGroups.restoreLatestGroup()
            updateStatusline()
    }
)
                
group.mappings.add([modes.NORMAL], ["vU"],
    "Restore TabGroup",
    function () CommandExMode().open("tabgrouprestore ")
)

group.mappings.add([modes.NORMAL], ["v<Left>", "vh", "gV"],
    "Go to the previous TabGroup",
    function ({count}) selectGroup(getPrevGroup(count, "Active")), 
    { count: true }
)

group.mappings.add([modes.NORMAL], ["v<Right>", "vl", "gv"],
    "Go to the next TabGroup",
    function ({count}) selectGroup(getNextGroup(count, "Active")), 
    { count: true }
)

group.mappings.add([modes.NORMAL], ["v<Up>", "vk", "v^"],
    "Go to the first TabGroup",
    function () selectGroup(getGroupByArgs("^"))
)

group.mappings.add([modes.NORMAL], ["v<Down>", "vj", "v$"],
    "Go to the last TabGroup",
    function () selectGroup(getGroupByArgs("$"))
)

group.mappings.add([modes.NORMAL], ["v>"],
    "Move current TabGroup to the right",
    function ({count}) {
        let pos = (selectedIndex() + (count || 1)) % groupCount() 
        allGroups.changeGroupOrder(selectedGroup(), pos)
        updateStatusline()
    }, { count: true }
)

group.mappings.add([modes.NORMAL], ["v<"],
    "Move current TabGroup to the left",
    function ({count}) {
        let pos = (selectedIndex() - (count || 1)) % groupCount()
        
        pos+=(pos<0 ? groupCount() : 0)
        
        allGroups.changeGroupOrder(selectedGroup(), pos)
        updateStatusline()
    }, { count: true }
)

// Options
group.options.add(["tabgroupshowindicator"],
    "Show indicators in TabGroup lists",
    "boolean", false
)

// Events
statusline.updateTabCount = updateStatusline


// vim:sw=4 ts=4 et si:
