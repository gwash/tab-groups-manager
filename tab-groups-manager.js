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
XML.ignoreWhitespace = false
XML.prettyPrinting = false
var INFO =
<plugin name="tab-groups-manager" version="0.5"
        href="https://github.com/gwash/tab-groups-manager"
        summary="TabGroups Manager addon integration"
        xmlns={NS}>
    <author email="mrawash@gmail.com">M Rawash</author>
    <license>GPL</license>
    <project name="Pentadactyl" minVersion="1.x"/>
    <p>
        This plugin adds some commands and mappings for the <link 
        topic="https://addons.mozilla.org/firefox/addon/tabgroups-manager">TabGroups
        Manager</link> addon.
    </p>

    <h3 tag="creating-tabgroups">Creating TabGroups</h3>
    <item>
        <tags>vc :tgcr :tgcreate :tabgroupcr :tabgroupcreate</tags>
        <spec>:tabgroupcr<oa>eate</oa> <oa>name</oa></spec>
        <spec>vc</spec>
        <description>
            <p>
                Create a new TabGroup with <oa>name</oa>. If <oa>!</oa> is given, new
                TabGroup will be focused.
            </p>
        </description>
    </item>
    <item>
        <tags>vo :tgop :tgopen :tgnew :tabgroupnew :tabgroupop :tabgroupopen</tags>
        <spec>
            :tabgroupop<oa>en</oa><oa>!</oa> <oa>-name=<a>name</a></oa> <oa>args</oa>
        </spec>
        <spec>vo</spec>
        <description>
            <p>
                Similar to <ex>:tabopen</ex> but opens <oa>args</oa> in a new TabGroup 
                with name <a>name</a> if specified. If <oa>!</oa> is given, new TabGroup 
                will be focused.
            </p>
        </description>
    </item>
    <item>
        <tags>vO</tags>
        <spec>vO</spec>
        <description>
            <p>Open a <ex>:tabgroupopen</ex> prompt followed by the current URL.</p>
        </description>
    </item>
    <item>
        <tags>:tgdu :tgduplicate :tabgroupdu :tabgroupduplicate</tags>
        <spec>:<oa>count</oa>tabgroupdu<oa>plicate</oa><oa>!</oa></spec>
        <description>
            <p>
                Duplicates current TabGroup <oa>count</oa> times. The last duplicate 
                TabGroup is focused if <oa>!</oa> is provided.
            </p>
        </description>
    </item>
    <item>
        <tags>:tabdetachgtog :tabdetachgtogroup</tags>
        <spec>:tabdetachgtog<oa>roup</oa><oa>!</oa> <oa>name</oa></spec>
        <description>
            <p>
                Detach the current tab, and open it in its own TabGroup with name 
                <oa>name</oa>, if supplied. If this is the last tab in a TabGroup, 
            the TabGroup will be closed.
            </p>
            <p>
                If <oa>!</oa> is added, the tab will be copied to a new TabGroup.
            </p>
        </description>
    </item>
    
    <h3 tag="navigating-tabgroups">Navigating TabGroups</h3>
    <item>
        <tags>vv :tg :tgroup :tabg :tabgroup</tags>
        <spec>:<oa>count</oa>tabg<oa>roup</oa> <oa>index|match</oa></spec>
        <spec><oa>count</oa>vv</spec>
        <description>
            <p>
                Go to the specified TabGroup from a list. Argument can be either a 
                TabGroup <em>index</em>, <em>match</em> or a 
                <link topic="tabgroups-special-characters">special 
                charcters</link>.
            </p>
            <p>    
                If <oa>count</oa> is given, focus the <oa>count</oa>th 
                TabGroup.
            </p>
            <p tag="tabgroups-special-characters">
                Special charcters supported by all
                <link topic="tab-groups-manager-plugin">tab-groups-manager</link> lists:
            </p>
            <dl dt="width: 6em;">
                <dt><hl key="Indicator">%</hl></dt>
                    <dd>The current TabGroup/tab, where indicated</dd>
                <dt><hl key="Indicator">#</hl></dt>
                    <dd>The alternate TabGroup/tab, where indicated</dd>
                <dt><hl>^</hl></dt>
                    <dd>First item in the list</dd>
                <dt><hl>$</hl></dt>
                    <dd>Last item in the list</dd>
            </dl>
        </description>
    </item>
    <item>
        <tags>vV :tgls :tabgroups</tags>
        <spec>:tabgroups <oa>filter</oa></spec>
        <spec>vV</spec>
        <description>
            <p>
                Show a list of TabGroups matching <oa>filter</oa>. Without 
                <oa>filter</oa> list all TabGroups.
            </p>
        </description>
    </item>
    <item>
        <tags>v&lt;Right&gt; vh gv :tgn :tgnext :tabgroupn :tabgroupnext</tags>
        <spec>:<oa>count</oa>tabgroupn<oa>ext</oa><oa>!</oa></spec>
        <spec><oa>count</oa>vh</spec>
        <description>
            <p>
                Go to the next or <oa>count</oa>th <em>active</em> TabGroup in the right 
                direction. If <oa>!</oa> is provided, <em>suspended</em> groups will 
                not be skipped.
            </p>
        </description>
    </item>
    <item>
        <tags>v&lt;Left&gt; vl gV :tgp :tgprevious :tabgroupp :tabgroupprevious</tags>
        <spec>:<oa>count</oa>tabgroupp<oa>revious</oa><oa>!</oa></spec>
        <spec><oa>count</oa>vl</spec>
        <description>
            <p>
                Go to the previous or <oa>count</oa>th <em>active</em> TabGroup in the 
                left direction. If <oa>!</oa> is provided, <em>suspended</em> groups 
                will not be skipped.
            </p>
        </description>
    </item>
    <item>
        <tags>v&lt;Up&gt; vk v^ :tgf :tgfirst :tabgroupf :tabgroupfirst :tabgrouprewind</tags>
        <spec>:tabgroupf<oa>irst</oa><oa>!</oa></spec>
        <spec>vk</spec>
        <description>
            <p>
                Go to the first <em>active</em> TabGroup. If <oa>!</oa> is provided, go 
                to the first <em>visible</em> TabGroup.
            </p>
        </description>
    </item>
    <item>
        <tags>v&lt;Down&gt; vj v$ :tgl :tglast :tabgroupl :tabgrouplast</tags>
        <spec>:tabgroupl<oa>ast</oa><oa>!</oa></spec>
        <spec>vj</spec>
        <description>
            <p>
                Go to the last <em>active</em> TabGroup. If <oa>!</oa> is provided, go 
                to the last <em>visible</em> TabGroup.
            </p>
        </description>
    </item>
    <item>
        <tags>vb :tgb :tgbuffer :tabgroupb :tabgroupbuffer</tags>
        <spec>:<oa>count</oa>tabgroupb<oa>uffer</oa> <oa>index|match</oa></spec>
        <description>
            <p>
                Go to the specified TabGroup buffer from the buffer list. It takes the 
                same arguments as <ex>:buffer</ex> in addition to the 
                <link topic="tabgroups-special-characters">special 
                charcters</link> available to all <link topic="tab-groups-manager-plugin">
                tab-groups-manager</link>'s lists.
            </p>
        </description>
    </item>
    <item>
        <tags>vB :tgbls :tabgroupbuffers</tags>
        <spec>:tabgroupbuffers <oa>filter</oa></spec>
        <spec>vB</spec>
        <description>
            <p>
                Show a list of the current TabGroup buffers matching <oa>filter</oa>. 
                Without <oa>filter</oa> list all tabs in TabGroup.
            </p>
        </description>
    </item>
    <item>
        <tags>:tabgroupedb :tabgroupedbuffer</tags>
        <spec>:tabgroupedb<oa>uffer</oa> <oa>index|match</oa></spec>
        <description>
            <p>
                Similar to <ex>:tabgroupbuffer</ex> but shows a list of all buffers, 
                <em>grouped</em> by <em>visible</em> TabGroups.
            </p>
            <note>
                This could be a complete replacement for <ex>:buffer</ex>.
            </note>
            <example>
                <ex>
                    nmap -d "Switch to a grouped buffer" b :tabgroupedbuffer&lt;Space&gt;
                </ex>
            </example>
        </description>
    </item>
    <item>
        <tags>:tabgroupedbuffers</tags>
        <spec>:tabgroupedbuffers <oa>filter</oa></spec>
        <description>
            <p>
                Show a list of all buffers matching <oa>filter</oa>.
                Without <oa>filter</oa> list all tabs grouped by TabGroups.
            </p>
            <example>
                <ex>
                    nmap -d "Show a list of grouped buffers" B -ex :tabgroupedbuffers
                </ex>
            </example>
        </description>
    </item>
    
    <h3 tag="reordering-tabgroups">Reordering TabGroups</h3>
    <item>
        <tags>:tgm :tgmove :tabgroupm :tabgroupmove</tags>
        <spec>:<oa>count</oa>tabgroupm<oa>ove</oa> <oa>index|match</oa></spec>
        <spec>:<oa>count</oa>tabgroupm<oa>ove</oa> <oa>+N|-N</oa></spec>
        <description>
            <p>
                Move the current TabGroup to the position of the TabGroup specified by 
                argument. <oa>+N|-N</oa> indicate a relative movement to the right or 
                left, wrapping around if hit either ends.
            </p>
        </description>
    </item>
    <item>
        <tags>v&gt;</tags>
        <spec><oa>count</oa>v&gt;</spec>
        <description>
            <p>
                Move the current TabGroup one or <oa>count</oa> spots in the right 
                direction.
            </p>
        </description>
    </item>
    <item>
        <tags>v&lt;</tags>
        <spec><oa>count</oa>v&lt;</spec>
        <description>
            <p>
                Move the current TabGroup one or <oa>count</oa> spots in the left
                direction.
            </p>
        </description>
    </item>
    <item>
        <tags>:tgsort :tabgroupsort</tags>
        <spec>:tabgroupsort</spec>
        <description>
            <p>
                Case-sensitive sort of <em>visible</em> TabGroups.
            </p>
        </description>
    </item>

    <h3 tag="deactivating-tabgroups">Deactivating/Restoring TabGroups</h3>
    <item>
        <tags>vs :tgsu :tgsuspend :tabgroupsu :tabgroupsuspend</tags>
        <spec>:tabgroupsu<oa>spend</oa> <oa>index|match</oa></spec>
        <spec>vs</spec>
        <description>
            <p>
                Suspend TabGroup specified by argument, or current if none was specified.
            </p>
        </description>
    </item>
    <item>
        <tags>:tgunsu :tgunsuspend :tabgroupunsu :tabgroupunsuspend</tags>
        <spec>:tabgroupunsu<oa>spend</oa><oa>!</oa> <a>index|match</a></spec>
        <description>
            <p>
                Restore suspended TabGroup specified by argument. If <oa>!</oa> is 
                given, restored TabGroup will be selected. 
            </p>
        </description>
    </item>
    <item>
        <tags>vS :tgsl :tgsleep :tabgroupsl :tabgroupsleep</tags>
        <spec>:tabgroupsl<oa>eep</oa> <oa>index|match</oa></spec>
        <spec>vS</spec>
        <description>
            <p>
                Sleep TabGroup specified by argument, or current if none was specified.
            </p>
        </description>
    </item>
    <item>
        <tags>:tgunsl :tgunsleep :tabgroupunsl :tabgroupunsleep</tags>
        <spec>:tabgroupunsl<oa>eep</oa><oa>!</oa> <a>index|match</a></spec>
        <description>
            <p>
                Restore sleeping TabGroup specified by argument. If <oa>!</oa> is given, 
                restored TabGroup will be selected.
            </p>
        </description>
    </item>
    <item>
        <tags>vd :tgde :tgdelete :tgcl :tgclose :tabgroupde :tabgroupdelete :tabgroupcl :tabgroupclose</tags>
        <spec>:tabgroupde<oa>lete</oa><oa>!</oa> <oa>index|match</oa></spec>
        <spec>vd</spec>
        <description>
            <p>
                Delete TabGroup specified by argument, or current if none was specified.
            </p>
            <p>
                If <oa>!</oa> is given, deleted TabGroup will not be saved to the closed
                TabGroups list, which means it can't be <em>restored</em> or seen later.
            </p>
        </description>
    </item>
    <item>
        <tags>vD</tags>
        <spec>vD</spec>
        <description>
            <p>
                Like <k>vd</k> but selects TabGroup to the left of the deleted TabGroup 
                after deletion.
            </p>
        </description>
    </item>
    <item>
        <tags>:tgunde :tgundelete :tguncl :tgunclose :tabgroupunde :tabgroupundelete :tabgroupuncl :tabgroupunclose</tags>
        <spec>:tabgroupunsl<oa>eep</oa><oa>!</oa> <a>index|match</a></spec>
        <description>
            <p>
                Restore closed TabGroup specified by argument. If <oa>!</oa> is given, 
                restored TabGroup will be selected.
            </p>
        </description>
    </item>
    <item>
        <tags>:tgon :tgonly :tabgroupon :tabgrouponly</tags>
        <spec>:tabgroupon<oa>ly</oa><oa>!</oa></spec>
        <description>
            <p>
                Sleep all TabGroups other than the one selected.
            </p>
            <p>
                If <oa>!</oa> is added, it will <em>close</em> all other TabGroups 
                instead.
            </p>
        </description>
    </item>
    <item>
        <tags>vu</tags>
        <spec>vu</spec>
        <description>
            <p>
                Restore last closed TabGroup. 
            </p>
            <p>
                Equivalent to <ex>:tabgroupunclose ^</ex>
            </p>
        </description>
    </item>
    <item>
        <tags>vU :tgundo :tgres :tgrestore :tabgroupundo :tabgroupres :tabgrouprestore</tags>
        <spec>:tabgroupres<oa>tore</oa><oa>!</oa> <a>index|match</a></spec>
        <spec>vU</spec>
        <description>
            <p>
                Restore any restorable TabGroup specified by argument. If <oa>!</oa> is 
                given, restored TabGroup will be selected.
            </p>
        </description>
    </item>
    <item>
        <tags>:tabgroupclear :tabgroupclearclosedlist</tags>
        <spec>:tabgroupclear<oa>closedlist</oa></spec>
        <description>
            <p>
                Clear <em>closed</em> TabGroups list.
            </p>
        </description>
    </item>
    
    <h3 tag="tabgroups-actions">TabGroups Actions</h3>
    <item>
        <tags>vr :tgrel :tgreload :tabgrouprel :tabgroupreload</tags>
        <spec>:tabgrouprel<oa>oad</oa> <oa>index|match</oa></spec>
        <spec>vr</spec>
        <description>
            <p>
                Reload all tabs in the specified TabGroup, or the current TabGroup if 
                none was specified.
            </p>
        </description>
    </item>
    <item>
        <tags>:tgren :tgrename :tabgroupren :tabgrouprename</tags>
        <spec>:tabgroupren<oa>ame</oa><oa>!</oa> <oa>-tabgroup=<a>index|match</a></oa> <oa>name</oa></spec>
        <description>
            <p>
                Rename current TabGroup, or the one specified by <em>-tabgroup</em> (short
                name: <em>-tg</em>), to <oa>name</oa>.
            </p>
            <p>
                If <oa>!</oa> is added and <oa>name</oa> was not given, it'll auto rename
                the specified TabGroup according to its currently selected tab.
            </p>
        </description>
    </item>
    <item>
        <tags>:tgbmark :tabgroupbo tabgroupbookmark</tags>
        <spec>:tabgroupbo<oa>okmark</oa><oa>-name=<a>name</a></oa><oa>index|match</oa></spec>
        <description>
            <p>
                Bookmark all tabs in TabGroup in a single folder named <oa>-name</oa> if 
                provided, or TabGroup's name, otherwise.
            </p>
        </description>
    </item>
    <item>
        <tags>:tgbmarkall :tabgroupbookmarka tabgroupbookmarkall</tags>
        <spec>:tabgroupbookmarka<oa>ll</oa><oa>-name=<a>name</a></oa><oa>-type=<a>type</a></oa></spec>
        <description>
            <p>
                Bookmark all TabGroups of type <oa>-type</oa> (short name: <em>-t</em>) or
                <em>visible</em> TabGroups otherwise, in a folder with name <oa>-name</oa>
                or one based on TabGroups type and current date.
            </p>
        </description>
    </item>
    <item>
        <tags>:tgdo :tabgroupdo</tags>
        <spec>:tabgroupdo<oa>!</oa> <a>cmd</a></spec>
        <description>
            <p>
                Execute <a>cmd</a> once in each <em>active</em> TabGroup. Each TabGroup
                is focused, in turn, and <a>cmd</a> is executed therin. The last TabGroup
                remains focused after execution.
            </p>
            <p>
                If <oa>!</oa> is added, it'll execute in all <em>visible</em> TabGroups. 
                Restoring suspended TabGroups in the process.
            </p>
        </description>
    </item>
    <item>
        <tags>:tabattachgtog :tabattachgtogroup</tags>
        <spec>:tabattachgtog<oa>roup</oa><oa>!</oa> <a>index|match</a></spec>
        <description>
            <p>
                Attach the current tab to the specified TabGroup. If this is the last 
                tab in a TabGroup, the TabGroup will be closed.
            </p>
            <p>
                If <oa>!</oa> is added, the tab will be copied rather than moved.
            </p>
        </description>
    </item>
    <item>
        <tags>:tgbar :tabgroupbartoggle</tags>
        <spec>:tabgroupbartoggle</spec>
        <description>
            <p>
                Toggle display of TabGroups bar.
            </p>
        </description>
    </item>

    <h3 tag="tabgroups-options">Options</h3>
    <item>
        <tags>'tgshowindicator' 'tabgroupshowindicator'</tags>
        <strut/>
        <spec>'tabgroupshowindicator' 'tgshowindicator'</spec>
        <type>boolean</type>
        <default>false</default>
        <description>
            <p>
                Whether to show indicators in TabGroup lists.
            </p>
        </description>
    </item>
</plugin>

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

    return  <>
            <span>[{getGroupTabCount(group)}] </span>
            <span highlight="URL" onclick={getGroupCommand(group.id, type)}>{text}</span>
            </>
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
        context.pushProcessor(0, function (item, text, next) <>
            <span highlight="Indicator" style="display: inline-block;">
                {item.item.indicator}
            </span>
            { next.call(this, item, text) }
        </>)
    
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
    
    context.pushProcessor(0, function (item, text, next) <>
        <span highlight="Indicator" style="display: inline-block;">
            {item.item.indicator}
        </span>
        { next.call(this, item, text) }
    </>)

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
        let title = <><span highlight="CompIcon">{<img src={getGroupIcon(g)}/>}</span>{
            (g.name || "(noname)")}</>

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
