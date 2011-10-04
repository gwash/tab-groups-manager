/* //{{{ 
Copyright (c) 2010-2010, coldwarmhot.
Copyright (c) 2011, M Rawash <mrawash@gmail.com>
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice,
       this list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.
    3. The names of the authors may not be used to endorse or promote products
       derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
THE POSSIBILITY OF SUCH DAMAGE.

##################################################################

*/ //}}}

var INFO = // {{{
<plugin name="tab-groups-manager" version="0.4"
        href=""
        summary="TabGroups Manager addon integration"
        xmlns={NS}>
    <author email="mrawash@gmail.com">M Rawash</author>
    <license>New BSD License</license>
    <project name="Pentadactyl" minVersion="1.x"/>
    <p>
        This plugin add some commands and mappings for the TabGroups Manager addon.
    </p>
    <item>
    <tags>group-key</tags>
    <tags>group-alt-key</tags>
    <description>
        <p>
        Group key is analog 't' for group and by default equal 'x'.
        Group alt key is analog 'b' for group and by default equal 'v'.
        </p>
        <p>
            options.tabgroupsmanager_group_key = 'x'
            options.tabgroupsmanager_group_alt_key = 'v'
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroup</tags>
    <spec>:<oa>count</oa>gr<oa>oup</oa><oa>!</oa> <a>name|id</a></spec>
    <spec><oa>count</oa>vv</spec>
    <description>
        <p>
            Go to the specified group from the group list.
            Argument can be either the group <a>id</a> or the <a>name</a>.
            If <oa>count</oa> is given, go to the <oa>count</oa>th group.
            If <oa>!</oa> is given, go to next group with <a>name</a>.
        </p>
    </description>
    </item>
    <item>
    <tags>gv</tags>
    <spec><oa>count</oa>gv</spec>
    <description>
        Repeat last :<ex>group</ex>! command.
    </description>
    </item>
    <item>
    <tags>gV</tags>
    <spec><oa>count</oa>gV</spec>
    <description>
        Repeat last :<ex>group</ex>! command in reverse direction. Just like gv but in the other direction.
    </description>
    </item>
    <item>
    <tags>:tabgroupcreate</tags>
    <spec>:tabgroupc<oa>reate</oa> <a>name</a></spec>
    <spec>vc</spec>
    <description>
        <p>Create new group with <a>name</a>.</p>
    </description>
    </item>
    <item>
    <tags>:tabgroupopen</tags>
    <spec>:tabgroupo<oa>pen</oa><oa>!</oa> <oa>arg1</oa>, <oa>arg2</oa>, ...</spec>
    <spec>x</spec>
    <description>
        <p>Just like <ex>:tabopen</ex> but also uses a new group for all of URLs.
        When used with <oa>!</oa>, the new group is not active.</p>
    </description>
    </item>
    <item>
    <tags>X</tags>
    <spec>X</spec>
    <description>
        <p>Show a <ex>:tabgroupopen</ex> prompt containing the current URL.
        Useful if you want to go somewhere by editing the URL of the current page.</p>
    </description>
    </item>
    <item>
    <tags>:tabgroups</tags>
    <spec>:tabgroups <oa>filter</oa></spec>
    <spec>V</spec>
    <description>
        <p>
          Show a list of groups matching <oa>filter</oa>. Without <oa>filter</oa> list all group.
        </p>
    </description>
    </item>
    <item>
    <tags>:grouptabopen</tags>
    <spec>:grouptabopen<oa>!</oa> <oa>-group group</oa><oa>arg1</oa>, <oa>arg2</oa>, ...</spec>
    <spec>vt</spec>
    <description>
        <p>Just like <ex>:tabopen</ex> but open tab in <oa>group</oa>.
        When used with <oa>!</oa>, the new tab is not active.</p>
    </description>
    </item>
    <item>
    <tags>:tabgroupbuffer</tags>
    <tags>:grouptab</tags>
    <spec>:tabgroupb<oa>uffer</oa> <a>index</a></spec>
    <spec>:groupt<oa>ab</oa> <a>index</a></spec>
    <spec>vb</spec>
    <description>
        <p>
          select buffer (=tab) of current group by <a>index</a>.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupedbuffer</tags>
    <tags>:groupedtab</tags>
    <spec>:tabgroupedb<oa>uffer</oa> <a>index</a></spec>
    <spec>:groupedt<oa>ab</oa> <a>index</a></spec>
    <description>
        <p>
          select buffer (=tab) of all group by <a>index</a>.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupbuffers</tags>
    <tags>:grouptabs</tags>
    <spec>:tabgroupbuffers <oa>filter</oa></spec>
    <spec>:grouptabs <oa>filter</oa></spec>
    <spec>vB</spec>
    <description>
        <p>
          Show a list of buffers (=tabs) of current groups matching <oa>filter</oa>.
          Without <oa>filter</oa> list all buffers of current group.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupedbuffers</tags>
    <tags>:groupedtabs</tags>
    <spec>:tabgroupedbuffers <oa>filter</oa></spec>
    <spec>:groupedtabs <oa>filter</oa></spec>
    <description>
        <p>
          Show a grouped list of buffers (=tabs) matching <oa>filter</oa>.
          Without <oa>filter</oa> grouped list all buffers.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupreload</tags>
    <spec>:tabgroupr<oa>eload</oa> <oa>group</oa></spec>
    <spec>vr</spec>
    <description>
        <p>
          Reload all tabs in <oa>group</oa>.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupmove</tags>
    <tags>:tgmove</tags>
    <spec>:<oa>count</oa>groupm<oa>ove</oa><oa>!</oa></spec>
    <spec>:tabgroupm<oa>ove</oa><oa>!</oa> <oa>N</oa></spec>
    <spec>:tabgroupm<oa>ove</oa><oa>!</oa> <oa>-N</oa> | <oa>+N</oa></spec>
    <spec>v&lt;</spec>
    <spec>v&gt;</spec>
    <description>
        <p>
          Move the current croup to a position before group <oa>count</oa>. Without <oa>count</oa> or <oa>count</oa> is 0 move the current croup to a position before group <oa>N</oa>. When <oa>N</oa> is 0, the current group is not moved. Without <oa>N</oa> the current group is made the last one. <oa>N</oa> can also be prefixed with "+" or "-" to indicate a relative movement. If <oa>!</oa> is specified the movement wraps around the start or end of the group list.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupprevious</tags>
    <tags>:tgprevious</tags>
    <spec>:tabgroupp<oa>revious</oa></spec>
    <spec>:tgp<oa>revious</oa></spec>
    <spec>[x</spec>
    <spec>gX</spec>
    <spec>vh</spec>
    <spec>v&lt;Left&gt;</spec>
    <description>
        <p>
          Select previous group.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupnext</tags>
    <tags>:tgnext</tags>
    <spec>:tabgroupn<oa>ext</oa></spec>
    <spec>:tgn<oa>ext</oa></spec>
    <spec>]x</spec>
    <spec>gx</spec>
    <spec>vl</spec>
    <spec>v&lt;Right&gt;</spec>
    <description>
        <p>
          Select next group.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupbookmark</tags>
    <spec>:tabgroupbo<oa>okmark</oa> <oa>group</oa></spec>
    <description>
        <p>
          Bookmark <oa>group</oa>.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupbookmarkall</tags>
    <spec>:tabgroupbookmarka<oa>ll</oa></spec>
    <description>
        <p>
          Bookmark all group.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabattachtogroup</tags>
    <spec>:tabattachtogroup <oa>group</oa></spec>
    <description>
        <p>
            Attach the current tab to another group. If this is the last tab in a group, the
            group will be closed.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabdetachtogroup</tags>
    <spec>:tabdetachtogroup <oa>name</oa></spec>
    <description>
        <p>
          Detach the current tab, and open it in its own group with <oa>name</oa>. As each group must contain at least one tab it is not possible to detach the only tab in a group.  Use <ex>:tabduplicatetogroup</ex> to copy the tab then call <ex>:tabdetachtogroup</ex>.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgrouprename</tags>
    <spec>:tabgrouprename <a>name</a></spec>
    <description>
        <p>
        Rename group by <oa>name</oa>.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupdelete</tags>
    <tags>:tabgroupclose</tags>
    <spec>:tabgroupd<oa>elete</oa> <oa>group</oa></spec>
    <spec>:tabgroupc<oa>lose</oa> <oa>group</oa></spec>
    <spec>vd</spec>
    <spec>vD</spec>
    <description>
        <p>
        Close <oa>group</oa> and all tabs in group. If <oa>!</oa> is specified the close only group.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupunclose</tags>
    <spec>:tabgroupunc<oa>lose</oa> <a>id</a></spec>
    <description>
        <p>
        Restore closed group by <a>id</a>.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupsleep</tags>
    <spec>:tabgroups<oa>leep</oa> <oa>group</oa></spec>
    <spec>vs</spec>
    <description>
        <p>
        Sleep <oa>group</oa>.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupunsleep</tags>
    <spec>:tabgroupuns<oa>leep</oa> <oa>id</oa></spec>
    <description>
        <p>
        Restore sleeping group by <a>id</a>.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgrouprestore</tags>
    <spec>:tabgroupr<oa>estore</oa> <a>id</a></spec>
    <description>
        <p>
        Restore group by <a>id</a>.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupclosedlistclear</tags>
    <spec>:tabgroupclosedlistclear</spec>
    <description>
        <p>
        Clear group closed list.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgrouponly</tags>
    <spec>:tabgroupo<oa>nly</oa><oa>!</oa></spec>
    <description><p>Sleep all another groups. If <oa>!</oa> is specified close all another group.</p></description>
    </item>
    <item>
    <tags>:tabgroupundo</tags>
    <spec>:<oa>count</oa>groupu<oa>ndo</oa><oa>!</oa></spec>
    <spec>:<oa>count</oa>grouprestorel<oa>ast</oa><oa>!</oa></spec>
    <spec>vu</spec>
    <spec>vU</spec>
    <description><p>Restore <oa>count</oa> last sleeping groups.  If <oa>!</oa> is specified restore closed groups.</p></description>
    </item>
    <item>
    <tags>:tabgrouprewind</tags>
    <spec>:<oa>count</oa>groupre<oa>wind</oa></spec>
    <spec>:<oa>count</oa>gre<oa>wind</oa></spec>
    <spec>v0</spec>
    <spec>v$</spec>
    <spec>vk</spec>
    <spec>v&lt;Up&gt;</spec>
    <description><p>Select <oa>count</oa>th or first group.</p></description>
    </item>
    <item>
    <tags>:tabgrouplast</tags>
    <spec>:<oa>count</oa>groupl<oa>ast</oa></spec>
    <spec>:<oa>count</oa>gl<oa>ast</oa></spec>
    <spec>v$</spec>
    <spec>vj</spec>
    <spec>v&lt;Down&gt;</spec>
    <description><p>Select <oa>count</oa>th or last group.</p></description>
    </item>
    <item>
    <tags>:tabgroupbartoggle</tags>
    <spec>:tabgroupbartoggle</spec>
    <description><p>Toogle group bar</p></description>
    </item>
    <item>
    <tags>:tabgroupdo</tags>
    <spec>:tabgroupdo<a>cmd</a></spec>
    <description>
        <p>
            Execute <a>cmd</a> in each group. <a>cmd</a> is executed in each group starting with the first and ending with the last which becomes the current group.
        </p>
        <p>
            <a>cmd</a> should not alter the group list state by adding, removing or reordering groups.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupduplicate</tags>
    <spec>:tabgroupdu<oa>plicate</oa></spec>
    <description>
        <p>
            Duplicate the current group and switch to the duplicate. If <oa>count</oa> is given, duplicate the group <oa>count</oa> times.
        </p>
    </description>
    </item>
    <item>
    <tags>:tabgroupsort</tags>
    <spec>:tabgroupsort</spec>
    <description>
        <p>
            Sort group list.
        </p>
    </description>
    </item>
</plugin>; // }}}

if (window.TabGroupsManager != undefined) { (function () {

// ---------------------------
// Variables
// ---------------------------
// {{{
options.tabgroupsmanager_group_key = 'x'
options.tabgroupsmanager_group_alt_key = 'v'
//}}}

// ---------------------------
// PLUGIN
// ---------------------------
// {{{

dactyl.plugins.tabgroupsmanager = (function(){ //{{{
    var plugin = {
        // Fields // {{{
        showGroupBar : false,
        lastId : -1,
        lastFilter : "",
        // }}}

        GroupProxy : (function(){ // {{{
            function cl(arg, type, silent) {
                type = (type || "auto")
                this.id = dactyl.plugins.tabgroupsmanager.getGroupIdByArgs(arg, type)
                if (type == "auto")
                    this.type = dactyl.plugins.tabgroupsmanager.groups.itemTypeById(this.id)
                else
                    this.type = type

                /* //not sure what this does, but it's annoying//
                if ((this.id == -1) && !silent)
                    alert("group id = -1")
                */
            }
            cl.prototype = {
                get plugin() {
                    return dactyl.plugins.tabgroupsmanager
                },
                get originalItem() {
                    // return TabGroupsManager.allGroups.getGroupById(this.id)
                    return plugin.groups.itemById(this.id)
                },
                index : function() {
                    if (this.id == -1)
                        return -1
                    return this.plugin.getIndex(this.originalItem)
                },
                get is_selected() {
                        return this.id == TabGroupsManager.allGroups.selectedGroup.id
                },
                get is_alterneted() {
                        return this.id == this.plugin.lastId
                },
                get name() {
                    if (this.id == -1)
                        return "undefined group"
                    return this.originalItem.name
                },
                get icon() {
                    if (this.id == -1)
                        return null
                    return this.originalItem.selectedTab.image
                },
                get indicator() {
                        return this.is_selected ? '%' : (this.is_alterneted ? '#' : ' ')
                },
                get guid() {
                    if (this.id == -1)
                        return "-1: `'"
                    return this.id + ": " + this.name
                },
                get url() {
                    return this.originalItem.selectedTab.linkedBrowser.contentDocument.location.href
                },
                get urls() {
                    let filter = null
                    let ret = []
                    for (var i = 0; i < this.originalItem.tabArray.length; i++) {
                        let el = this.originalItem.tabArray[i]
                        if (filter) {
                            if (re.test(el.label))
                                ret.push(el.linkedBrowser.contentDocument.location.href)
                        } else
                            ret.push(el.linkedBrowser.contentDocument.location.href)
                    }
                    return ret
                },
                //FIXME
                get tabIndex() {
                    return this.originalItem.tabArray.indexOf(this.originalItem.selectedTab)
                },
                get tabCount() {
                    return this.originalItem.tabArray.length
                },
                // Tabs
                get previous() {
                    return this.plugin.getGroupByIndex(this.index() - 1)
                },
                get next() {
                    return this.plugin.getGroupByIndex(this.index() + 1)
                },
                tabsByFilter : function(filter) {
                    return dactyl.plugins.tabgroupsmanager.groupTabs(this.originalItem, filter)
                },
                // Update,
                beginUpdate : function () {
                    this.showGroupBar = TabGroupsManager.groupBarDispHide.dispGroupBar
                },
                endUpdate : function () {
                    TabGroupsManager.groupBarDispHide.dispGroupBar = this.showGroupBar
                    dactyl.plugins.tabgroupsmanager.updateTabCount()
                },
                withUpdate : function (action, obj, args) {
                    this.beginUpdate()
                    let ret = action && action.apply(obj, args)
                    this.endUpdate()
                    return ret
                },
                withUpdateWithSourceGroup : function (action, args) {
                    return this.withUpdate(this.originalItem[action], this.originalItem, args)
                },
                // Methods
                select: function () {
                    this.beginUpdate()
                    //TabGroupsManager.allGroups.selectedGroup = this.originalItem
                    //TabGroupsManager.allGroups.groupbar.selectedItem = TabGroupsManager.allGroups.selectedGroup.groupTab
                    TabGroupsManager.allGroups.groupbar.selectedItem = this.originalItem.groupTab
                    dactyl.plugins.tabgroupsmanager.lastId = this.originalItem.id
                    this.endUpdate()
                    dactyl.focusContent()
                    return this
                },
                setName: function(value, auto) {
                    this.beginUpdate()
                    if (value=="" && auto)  
                        TabGroupsManager.allGroups.selectedGroup.autoRenameNameOnly();
                    else
                        this.originalItem.setName(value)
                    this.endUpdate()
                },
                selectTab: function(count) {
                    let tab = this.originalItem.tabArray[count]
                    this.beginUpdate()
                    if (tab)
                        this.originalItem.setSelectedTab(tab)
                    this.endUpdate()
                },
                selectPreviousTab: function(special) {
                    this.beginUpdate()
                    let tab = this.originalItem.getPreviousTabInGroup(this.originalItem.selectedTab)
                    if (tab)
                        this.originalItem.setSelectedTab(tab)
                    else if (special)
                        this.originalItem.setSelectedTab(this.originalItem.lastTab)
                    this.endUpdate()
                },
                selectNextTab: function(special) {
                    this.beginUpdate()
                    let tab = this.originalItem.getNextTabInGroup(this.originalItem.selectedTab)
                    if (tab)
                        this.originalItem.setSelectedTab(tab)
                    else if (special)
                        this.originalItem.setSelectedTab(this.originalItem.firstTab)
                    else
                        this.originalItem.setSelectedTab(this.originalItem.firstTab)
                    this.endUpdate()
                },
                loadUrls : function (a_urls) {
                    if (!a_urls)
                        return 0
                    let ret = 0
                    for (var i = a_urls.length - 1; i >= 0; i--) {
                        let tab = gBrowser.addTab(a_urls[i])
                        this.originalItem.addTab(tab, false)
                        ret = ret + 1
                    }
                    return ret
                },
                reloadUrls : function (a_urls) {
                    let ret = 0
                    let last_len = this.originalItem.tabArray.length
                    let first_tab = this.originalItem.tabArray[0]
                    this.beginUpdate()
                    for (var i = this.originalItem.tabArray.length - 1; i > 0; i--) {
                        tabs.remove(this.originalItem.tabArray[i])
                    }
                    dactyl.open("about:blank")
                    if (!a_urls || (a_urls.length == 0)) {
                        this.endUpdate()
                        // dactyl.echoerr("reloadUrls with length(a_urls) = 0")
                        return
                    }
                    if (false) {
                        ret = this.loadUrls(a_urls)
                        if (last_len > 0)
                            tabs.remove(first_tab)
                    } else {
                        dactyl.open(a_urls[0])
                        ret = this.loadUrls(a_urls.slice(1))
                    }
                    this.endUpdate()
                    return ret
                },
                reload: function() {
                    if (this.originalItem.reloadTabInGroup)
                        this.withUpdateWithSourceGroup("reloadTabInGroup", [])
                    else if (this.originalItem.reloadTabsInGroup)
                        this.withUpdateWithSourceGroup("reloadTabsInGroup", [])
                    dactyl.echomsg("Group `" + this.name + "' did reload.")
                },
                move: function(pos, abs) {
                    this.beginUpdate()
                    if (pos == null) {
                        alert('pos == null')
                        return this
                    }
                    if (abs)
                        var new_pos = pos
                    else
                        var new_pos = (this.index() + pos) % TabGroupsManager.allGroups.childNodes.length
                    TabGroupsManager.allGroups.changeGroupOrder(this.originalItem, new_pos)
                    this.endUpdate()
                },
                bookmark: function() {
                    this.withUpdateWithSourceGroup("bookmarkThisGroupCore", [this.originalItem.name])
                },
                attachTab: function(tab) {
                    this.beginUpdate()
                    if (tab)
                        this.originalItem.dndMoveTabToGroup(tab)
                    else
                        this.originalItem.dndMoveTabToGroup(TabGroupsManager.allGroups.selectedGroup.selectedTab)
                    this.endUpdate()
                },
                sleep: function() {
                    if (this.id == -1) {
                        dactyl.echoerr('nobody group not sleeping');
                        return false;
                    }
                    this.withUpdateWithSourceGroup("sleepGroup", [])
                },
                suspend: function() {
                    this.withUpdateWithSourceGroup("suspendGroup", [])
                },
                close: function(reverse) {
                    let prev = this.previous
                    this.withUpdateWithSourceGroup("close", [])
                    if (reverse)
                        prev.select()
                    dactyl.echomsg("Close group with name `" + this.name + "'")
                },
                closeAllTabsAndSelf: function(reverse) {
                    let prev = this.previous
                    this.withUpdateWithSourceGroup("closeAllTabsAndGroup", [])
                    if (reverse)
                        prev.select()
                    dactyl.echomsg("Close group with name `" + this.name + "' and its tabs")
                },
                deleteOtherGroups : function(special) {
                    this.beginUpdate()
                    for (var i = 0; i < TabGroupsManager.allGroups.childNodes.length; i++) {
                        if (TabGroupsManager.allGroups.childNodes.item(i).group.id != this.id) {
                            if (special)
                                TabGroupsManager.allGroups.childNodes.item(i).group.closeAllTabsAndGroup()
                            else
                                TabGroupsManager.allGroups.childNodes.item(i).group.sleepGroup()
                        }
                    }
                    this.endUpdate()
                },
                unsuspend: function(){
                    if (this.id!=-1 ) {
                        this.withUpdateWithSourceGroup("unsuspendGroup", [])
                        return this
                    } else
                        return false
                },   
                unsleep: function(){
                    if (this.id!=-1) {
                        this.beginUpdate()
                        TabGroupsManager.sleepingGroups.restoreGroup(this.id)
                        this.endUpdate()
                        return this
                    } else
                        return false
                },
                unclose: function(){
                    if (this.id!=-1) {
                        this.beginUpdate()
                        TabGroupsManager.closedGroups.restoreGroup(this.id)
                        this.endUpdate()
                        return this
                    } else
                        return false  
                },
                restore: function(){
                    let type = plugins.tabgroupsmanager.groups.itemTypeById(this.id)
                    switch (type){
                        case "normal":
                            return this.unsuspend()
                        case "sleeping":
                            return this.unsleep()
                        case "closed":
                            return this.unclose()
                        default:
                            return false
                     }
                },
                duplicate : function (count) {
                    let urls = this.urls
                    count = count || 0
                    for (var i = 0; i < count; i++) {
                        dactyl.plugins.tabgroupsmanager.createGroup(urls, [], null, false)
                    }
                }
            };
            return cl;
        })(), //}}}

        Groups : (function(){ // {{{
            function cl() {
            }
            cl.prototype = {
                get plugin() {
                    return dactyl.plugins.tabgroupsmanager
                },
                get originalCount() {
                    return TabGroupsManager.allGroups.childNodes.length
                },
                originalItem : function (index) {
                    return TabGroupsManager.allGroups.childNodes.item(index)
                },
                get originalItems () {
                    ret = []
                    for (var i = 0; i < this.originalCount; i++) {
                        ret.push(this.originalItem(i))
                    }
                    return ret
                },
                // Normal groups
                get count () {
                    return this.originalCount
                },
                item : function (index) {
                    return new plugin.GroupProxy(this.originalItem(index).group.id, "auto")
                },
                get items () {
                    ret = []
                    for (var i = 0; i < this.count; i++) {
                        ret.push(this.item(i))
                    }
                    return ret
                },
                // Closed groups
                get closedCount () {
                    return TabGroupsManager.closedGroups.store.length
                },
                closedItem : function (index) {
                    return TabGroupsManager.closedGroups.store[index]
                },
                // Sleeping groups
                get sleepingCount () {
                    return TabGroupsManager.sleepingGroups.store.length
                },
                sleepingItem : function (index) {
                    return TabGroupsManager.sleepingGroups.store[index]
                },
                // Meta groups
                get metaItems () {
                    ret = []
                    for (var i = 0; i < this.originalCount; i++) {
                        ret.push(new plugin.GroupProxy(this.originalItem(i).group.id, "normal"))
                    }
                    for (var i = 0; i < this.closedCount; i++) {
                        ret.push(new plugin.GroupProxy(this.closedItem(i).id, "closed"))
                    }
                    for (var i = 0; i < this.sleepingCount; i++) {
                        ret.push(new plugin.GroupProxy(this.sleepingItem(i).id, "sleeping"))
                    }
                    return ret
                },
                // Filter
                filterByName : function (items, pattern, fuzzy) {
                    let ret = []
                    for (var i = 0; i < items.length; i++) {
                        if (fuzzy) {
                            if (items[i].name.match(pattern)) {
                                ret.push(items[i])
                            }
                        } else {
                            if (items[i].name == pattern) {
                                ret.push(items[i])
                            }
                        }
                    }
                    if (ret.length == 0)
                        return null
                    else
                        return ret
                },
                itemsByName : function (name) {
                    return (this.filterByName(this.items, name, false)
                        || this.filterByName(this.items, name, true)
                        || [])
                },
                metaItemsByName : function (name) {
                    return (this.filterByName(this.metaItems, name, false)
                        || this.filterByName(this.metaItems, name, true)
                        || [])
                },
                //
                itemTypeById : function (id) {
                    if (id == -1)
                        return "null"
                    else if (TabGroupsManager.allGroups.getGroupById(id))
                        return "normal"
                    else if (TabGroupsManager.closedGroups.getGroupById(id))
                        return "closed"
                    else if (TabGroupsManager.sleepingGroups.getGroupById(id))
                        return "sleeping"
                    else
                        return "null"
                },
                itemById : function (id) {
                    let type = this.itemTypeById(id)
                    if (type == "null")
                        return null
                    else if (type == "normal")
                        return TabGroupsManager.allGroups.getGroupById(id)
                    else if (type == "closed")
                        return TabGroupsManager.closedGroups.getGroupById(id)
                    else if (type == 'sleeping')
                        return TabGroupsManager.sleepingGroups.getGroupById(id)
                    else
                        return null
                },
                // Getting group
                get index () {
                    return TabGroupsManager.allGroups.groupbar.selectedIndex
                },
                get current() {
                    return new plugin.GroupProxy(TabGroupsManager.allGroups.selectedGroup.id)
                },
                get previous() {
                    return this.getGroupByIndex(this.index - 1)
                },
                get next() {
                    return this.getGroupByIndex(this.index + 1)
                },
                get first() {
                    return new plugin.GroupProxy(TabGroupsManager.allGroups.firstChild.group.id)
                },
                get last() {
                    return new plugin.GroupProxy(TabGroupsManager.allGroups.lastChild.group.id)
                },
                get lastClosed() {
                    return dactyl.plugins.tabgroupsmanager.lastClosedGroup()
                },
                get lastSleeping() {
                    return dactyl.plugins.tabgroupsmanager.lastSleepingGroup()
                },
                get lastRestorable() {
                    return dactyl.plugins.tabgroupsmanager.lastRestorableGroup()
                },
                get caption () {
                    let c = this.current
                    return ("[" + (c.tabIndex + 1) + "/" + c.tabCount + "] " + c.name +  "(" + (this.index + 1) + "/" + this.count + ") ");
                },
                // Update
                beginUpdate : function () {
                    this.showGroupBar = TabGroupsManager.groupBarDispHide.dispGroupBar
                },
                endUpdate : function () {
                    TabGroupsManager.groupBarDispHide.dispGroupBar = this.showGroupBar
                    dactyl.plugins.tabgroupsmanager.updateTabCount()
                },
                withUpdate : function (action, obj, args) {
                    this.beginUpdate()
                    let ret = action.apply(obj, args)
                    this.endUpdate()
                    return ret
                },
                withUpdateWithSourceGroup : function (action, args) {
                    return this.withUpdate(this.originalItem[action], this.originalItem, args)
                },
                // Methods
                getItemsByFilter : function (filter) {
                    ret = []
                    let re = new RegExp('.*' + filter + '.*', 'ig')
                    for (var i = 0; i < this.originalCount; i++) {
                        if (filter) {
                            if (this.originalItem(i).group.name.match(re))
                                ret.push(this.originalItem(i))
                        } else
                            ret.push(this.originalItem(i))
                    }
                    let GroupProxy = this.plugin.GroupProxy
                    return ret.map(function (item) new GroupProxy(item.group.id))
                },
                sort : function () {
                    swap = function (from, to) {
                        TabGroupsManager.allGroups.changeGroupOrder(from, to)
                    }
                    let l = this.originalCount
                    this.beginUpdate()
                    for (var i = 0; i < l; i++)
                        for (var j = i; j < l; j++) {
                        if (this.originalItem(i).group.name > this.originalItem(j).group.name)
                            swap(this.originalItem(i).group, j)
                        }
                    this.endUpdate()
                },
            };
            return cl;
        })(), //}}}

        BrowserObjectGroup : (function(){ // {{{
            function BOGroup(){}
            BOGroup.prototype = {
                close: function(ary){
                    for (var i = 0 ; i < ary.length; i++){
                        let j = ary[i];
                        window.setTimeout(function(){ j.group.closeAllTabsAndGroup(); },0);
                    }
                },
                yank: function(ary){
                    var copyStrings = [];
                    for (var i = 0 ; i < ary.length; i++)
                        if(typeof ary[i] == "object")
                            copyStrings.push(ary[i].group.name);
                    dactyl.modules.util.copyToClipboard(copyStrings.join(", "));
                },
                mark: function(ary,arg){
                    var markStrings = [];
                    for (var i = 0 ; i < ary.length; i++)
                        if(typeof ary[i] == "object") {
                            markStrings.push(ary[i].linkedBrowser.contentDocument.location.href);
                            for (var j = 0; j < ary[i].group.tabArray.length; j++) {
                                markStrings.push(ary[i].group.tabArray[j].linkedBrowser.contentDocument.location.href);
                            }
                        }
                    dactyl.modules.quickmarks.add(arg,markStrings.join(", "));
                },
                reload: function(ary){
                    for (var i = 0 ; i < ary.length; i++)
                        if(typeof ary[i] == "object")
                            ary[i].group.reloadTabInGroup()
                },
                //
                active: function() dactyl.plugins.tabgroupsmanager.selectedIndex(),
                identify: function(i){try{return i.group.selectedTab.linkedBrowser.contentDocument.location.host}catch(e){}},
                href: function(i){try{return i.group.selectedTab.linkedBrowser.contentDocument.location.href}catch(e){}},
                title: function(i){try{return i.group.selectedTab.linkedBrowser.contentDocument.title}catch(e){}},
                pinned: function(i){
                    if(typeof i == "object"){
                        return i.group.selectedTab.linkedBrowser.vimperatorBrowserObjectPin
                    }
                    return false;
                },
                collection: function() dactyl.plugins.tabgroupsmanager.groups.getItemsByFilter("").map(function(el) el.originalItem)
            };
            return BOGroup;
        })(), //}}}

        // Methods // {{{
        // Update
        beginUpdate : function () {
             this.showGroupBar = TabGroupsManager.groupBarDispHide.dispGroupBar
        },
        endUpdate : function () {
            TabGroupsManager.groupBarDispHide.dispGroupBar = this.showGroupBar
            this.updateTabCount()
        },
        updateTabCount : function () {
            if (dactyl.has("tabs")) {
                let tabCountWidget = document.getElementById("dactyl-statusline-field-tabcount");
                tabCountWidget.value = dactyl.plugins.tabgroupsmanager.groups.caption
                }
        },
        // Indices
        hasIndex : function (index) {
            // XXX for tab? add group!
            for (var i = 0; i < TabGroupsManager.allGroups.selectedGroup.tabArray.length; i++) {
                if (TabGroupsManager.allGroups.selectedGroup.tabArray[i]._tPos == index)
                    return true
            }
            return false
        },
        getIndex : function (group) {
            for (var i = 0; i < TabGroupsManager.allGroups.childNodes.length; i++) {
                if (TabGroupsManager.allGroups.childNodes.item(i).group.id == group.id)
                    return i
            }
            return -1
        },
        selectedIndex : function (group) {
            return TabGroupsManager.allGroups.groupbar.selectedIndex
        },
        groupCount : function () {
            return TabGroupsManager.allGroups.childNodes.length
        },
        getFirst : function (name, type) {
        },
        getGroupIdByName : function (name, type) {
            let items_funs = {
                auto: function (name) this.groups.metaItemsByName(name),
                normal: function (name) this.groups.itemsByName(name)}
            if (type == 'auto') {
                // let ids = this.groups.getItemsByFilter(name).map(function (el) el.id)
                // if (ids.length > 0)
                //     return ids[0]
                return ids = this.groups.metaItemsByName(name).map(function (el) el.id)[0]
            } else if (type == 'normal') {
                // let ids = this.groups.getItemsByFilter(name).map(function (el) el.id)
                // if (ids.length > 0)
                //     return ids[0]
                return ids = this.groups.itemsByName(name).map(function (el) el.id)[0]
//                for (var i = 0; i < TabGroupsManager.allGroups.childNodes.length; i++) {
//                    if (TabGroupsManager.allGroups.childNodes.item(i).group.name.match(name)) {
//                        return TabGroupsManager.allGroups.childNodes.item(i).group.id
//                    }
//                }
            } else if (type == 'restorable') {
                for (var i = 0; i < TabGroupsManager.allGroups.length; i++) {
                    let g = TabGroupsManager.allGroups.childNodes[i].group
                    if (g.suspened){
                        if (g.name.match(name))
                            return g.id
                    }
                }
                for (var i = 0; i < TabGroupsManager.sleepingGroups.store.length; i++) {
                    if (TabGroupsManager.sleepingGroups.store[i].name.match(name)) {
                        return TabGroupsManager.sleepingGroups.store[i].id
                    }
                }
                for (var i = 0; i < TabGroupsManager.closedGroups.store.length; i++) {
                    if (TabGroupsManager.closedGroups.store[i].name.match(name)) {
                        return TabGroupsManager.closedGroups.store[i].id
                    }
                }
            } else if (type == 'sleeping') {
                for (var i = 0; i < TabGroupsManager.sleepingGroups.store.length; i++) {
                    if (TabGroupsManager.sleepingGroups.store[i].name.match(name)) {
                        return TabGroupsManager.sleepingGroups.store[i].id
                    }
                }
            } else if (type == 'closed') {
                for (var i = 0; i < TabGroupsManager.closedGroups.store.length; i++) {
                    if (TabGroupsManager.closedGroups.store[i].name.match(name)) {
                        return TabGroupsManager.closedGroups.store[i].id
                    }
                }
            }
            return -1
        },
        getGroupIdByArgs : function (arg, type) {
            if (!arg || (arg == "") || (arg == "%")) {
                return TabGroupsManager.allGroups.selectedGroup.id
            } else if (arg == "#") {
                return this.lastId
            } else if (arg == "0") {
                return TabGroupsManager.allGroups.firstChild.group.id
            } else if (arg == "$") {
                return TabGroupsManager.allGroups.lastChild.group.id
            } else {
                if (typeof arg == "object")
                    return arg
                else if (typeof arg == "number")
                    return arg
                else if (typeof arg == "string") {
                    if (/^\d+:.*$/.test(arg))
                        return parseInt(arg)
                    else
                        return this.getGroupIdByName(arg, type)
                } else
                    return this.getGroupIdByName(arg, type)
            }
            return -1
        },
        getGroupByArgs : function (args) {
            let id = this.getGroupIdByArgs(args, 'auto')
            // return this.getGroupById(id)
            return this.groups.itemById(id)
        },
        // Getting group
        group : function (arg, silent) {
            return new this.GroupProxy(arg, 'auto', silent)
        },
        restorableGroup : function (arg) {
            return new this.GroupProxy(arg, 'restorable')
        },
        getGroupByIndex : function (index) {
            return new this.GroupProxy(TabGroupsManager.allGroups.childNodes[index].group.id)
        },
        getNextActiveGroup : function (index) {
            for (var i = index + 1; i < plugins.tabgroupsmanager.groupCount(); i++) {
                let g = TabGroupsManager.allGroups.childNodes[i].group
                if (!g.suspended)
                    return i
            }
            return arguments.callee(-1)
        },
        getPrevActiveGroup : function (index) {
            for (var i = index - 1; i > -1; i--) {
                let g = TabGroupsManager.allGroups.childNodes[i].group
                 if (!g.suspended)
                    return i
            }
            return arguments.callee(this.groupCount())
        },
        groupTabs : function (group, filter) {
            ret = []
            let re = new RegExp('.*' + filter + '.*', 'ig')
            for (var i = 0; i < group.tabArray.length; i++) {
                let el = group.tabArray[i]
                if (filter) {
                    if (re.test(el.label))
                        ret.push(el)
                } else
                    ret.push(el)
            }
            return ret
        },
        // Elements
        groupElements : function () {
            var ret = []
            for (var i = 0; i < TabGroupsManager.allGroups.childNodes.length; i++) {
                let g = TabGroupsManager.allGroups.childNodes.item(i).group
                let count = g.displayTabCount.toString().replace(/^(\d)$/,"0$1")
                let label = !g.suspended ? g.selectedTab.label : "suspended - " + g.name
                let indicator = (g==TabGroupsManager.allGroups.selectedGroup) ? "%" : " "
                let image = g.image!="" ? g.image : g.selectedTab ? g.selectedTab.image : ""

                ret.push({
                    text: i+1 + ": " + g.name,
                    description: label,
                    tabcount: count,
                    indicator: indicator,
                    icon: image,
                    command: "top.dactyl.plugins.tabgroupsmanager.group('" + g.name + "').select()" 
                });
             }
            return ret
        },
        groupTabElements : function (group) {
            if (!group)
                group = TabGroupsManager.allGroups.selectedGroup
            var ret = []
            for (var i = 0; i < group.tabArray.length;i++) {
                let tab = group.tabArray[i];
                let url = tab.linkedBrowser.contentDocument.location.href;
                let indicator = " ";

                if (tab._tPos == group.selectedTab._tPos)
                   indicator = "%"
                else if (tabs.alternate && tab._tPos == tabs.alternate._tPos)
                   indicator = "#";
 
                ret.push({
                    text: [i+1 + ": " + (tab.label || "(Untitled)"), i+1 + ": " + url],
                    url:  template.highlightURL(url),
                    indicator: indicator,
                    icon: tab.image || BookmarkCache.DEFAULT_FAVICON
                });
            }
            return ret
        },
        groupedTabElements : function (group) {
            if (!group)
                group = TabGroupsManager.allGroups.selectedGroup
            var ret = []
            for (var i = 0; i < TabGroupsManager.allGroups.childNodes.length; i++) {
                let group = TabGroupsManager.allGroups.childNodes.item(i).group
                for (var j = 0; j < group.tabArray.length; j++) {
                    let tab = group.tabArray[j]
                    let guid = (tab._tPos + 1) + ": "+ tab.label
                    let caption = group.name + " - " +  template.highlightURL(tab.linkedBrowser.contentDocument.location.href)
                    let el = [guid, caption]
                    el.icon = tab.image
                    ret.push(el)
                }
            }
            return ret
        },
        sleepingGroupElements : function () {
            var ret = []
            for (var i = 0; i < TabGroupsManager.sleepingGroups.store.length; i++) {
                let g = TabGroupsManager.sleepingGroups.store[i]
                let count = g.tabs.length.toString().replace(/^(\d)$/,"0$1")
                let label = g.titleList.replace(/^\s*$/,g.name)
                
                ret.push({
                    text: g.id + ": " + g.name,
                    description: label,
                    tabcount: count,
                    icon: g.image,
                    command: "top.dactyl.plugins.tabgroupsmanager.restorableGroup('" + g.name + "').unsleep().select()" 
                });
            }
            return ret
        },
        suspendedGroupElements : function () {
            var ret = []
            for (var i = 0; i < TabGroupsManager.allGroups.childNodes.length; i++) {
                let g = TabGroupsManager.allGroups.childNodes.item(i).group
                
                if (!g.suspended) continue;
                
                let count = g.displayTabCount.toString().replace(/^(\d)$/,"0$1")
                let label = g.suspendTitleList.replace(/^\s*$/,g.name)
                 
                ret.push({
                    text: g.id + ": " + g.name,
                    description: label,
                    tabcount: count,
                    icon: g.image,
                    command: "top.dactyl.plugins.tabgroupsmanager.group('" + g.name + "').select()" 
                });
            }
            return ret
        },
        closedGroupElements : function () {
            var ret = []
            for (var i = 0; i < TabGroupsManager.closedGroups.store.length; i++) {
                let g = TabGroupsManager.closedGroups.store[i]
                let count = g.tabs.length.toString().replace(/^(\d)$/,"0$1")
                let label = g.titleList.replace(/^\s*$/,g.name)
                
                ret.push({
                    text: g.id + ": " + g.name,
                    description: label,
                    tabcount: count,
                    icon: g.image,
                    command: "top.dactyl.plugins.tabgroupsmanager.restorableGroup('" + g.name + "').unclose().select()" 
                });
             }
            return ret
        },
        restorableGroupElements : function () {
            return this.suspendedGroupElements() + this.sleepingGroupElements() + this.closedGroupElements()
        },

        groupDescription: function (item, text)
        <>
            <span>[{item.tabc}] <span highlight="URL" onclick={item.command}>{text}</span></span>
        </>,

        // Completion
        completion_group : function (context) {
            let filter = context.filter.toLowerCase();
            context.anchored = false;
            context.title = ['Group', '[Length] Tab'];
            context.keys = {
                text: "text",
                description: "description",
                tabc: "tabcount",
                indicator: "indicator",
                icon: "icon", 
                command: "command" 
            };
            context.compare = CompletionContext.Sort.number;
//            context.pushProcessor(0, function (item, text, next) <>
//                <span highlight="Indicator" style="display: inline-block;">{item.item.indicator}</span>
//                { next.call(this, item, text) }
//            </>);
            context.process[1] = function (item, text) plugins.tabgroupsmanager.groupDescription(item, text);
            context.completions = this.groupElements();
        },
        completion_groupTab : function (context) {
            let filter = context.filter.toLowerCase();
            context.anchored = false;
            context.title = ["Group Buffers"];
            context.keys = { text: "text", description: "url", icon: "icon" };
            context.compare = CompletionContext.Sort.number;
            context.pushProcessor(0, function (item, text, next) <>
                <span highlight="Indicator" style="display: inline-block;">{item.item.indicator}</span>
                { next.call(this, item, text) }
            </>);
            context.completions = this.groupTabElements(undefined);
        },
       completion_groupedTab : function (context) {
            context.filters = [function() true];
            context.title = ['Tab', 'Group - Url'];
            context.completions = this.groupedTabElements(undefined);
        },
        completion_inactiveGroup : function (context, caption, func){
            filter = context.filter.toLowerCase();
            context.anchored = false;
            context.title = [caption, '[Length] Title list'];
            context.keys = {
                text: "text",
                description: "description",
                tabc: "tabcount",
                icon: "icon", 
                command: "command" 
            };
            context.compare = CompletionContext.Sort.number;
            context.process[1] = function (item, text) plugins.tabgroupsmanager.groupDescription(item, text);
            context.completions = dactyl.plugins.tabgroupsmanager[func].apply(dactyl.plugins.tabgroupsmanager, [])
        },
        completion_sleepingGroup : function (context){
            return this.completion_inactiveGroup(context, 'Sleeping Group', "sleepingGroupElements")
        },
        completion_suspendedGroup : function (context){
            return this.completion_inactiveGroup(context, 'Suspended Group', "suspendedGroupElements")
        },
        completion_closedGroup : function (context){
            return this.completion_inactiveGroup(context, 'Closed Group', "closedGroupElements")
        },
        completion_restorableGroup : function (context){
            return dactyl.plugins.tabgroupsmanager.completion_inactiveGroup(context, 'Group', "restorableGroupElements")
        },

        // Group
        groupLoadUrls : function (group, a_urls) {
            if (!a_urls)
                return 0
            ret = 0
            for (var i = a_urls.length - 1; i >= 0; i--) {
                //if ((i == 0) && !silent) {
                //    dactyl.open(a_urls[i], dactyl.CURRENT_TAB)
                //} else {
                //    dactyl.open(a_urls[i], dactyl.NEW_BACKGROUND_TAB)
                //}
                let tab = gBrowser.addTab(a_urls[i])
                group.addTab(tab, false)
                ret = ret + 1
            }
            return ret
        },
        createGroup : function(a_urls, a_tabs, name, silent) {
            this.beginUpdate()
            let count = 0
            if (name == "")
                name = null

            if (a_tabs.length > 0)
                var tab = tabs[0]
            else if (a_urls.length > 0)
                var tab = gBrowser.addTab(a_urls[0])
            else
                var tab = null

            if (silent)
                var group = TabGroupsManager.allGroups.openNewGroup(tab, null, name, null)
            else
                var group = TabGroupsManager.allGroups.openNewGroupActive(tab, null, name, null)

            // for (var i = ((a_tabs.length > 0) ? 0 : 1); i < a_urls.length; i++) {
            //     //if ((i == 0) && !silent) {
            //     //    dactyl.open(a_urls[i], dactyl.CURRENT_TAB)
            //     //} else {
            //     //    dactyl.open(a_urls[i], dactyl.NEW_BACKGROUND_TAB)
            //     //}
            //     tab = gBrowser.addTab(a_urls[i])
            //     group.addTab(tab, false)
            //     count = count + 1
            // }

            if (a_urls)
                count = count + this.groupLoadUrls(group, a_urls.slice((a_tabs.length > 0) ? 0 : 1))

            for (var i = 1; i < a_tabs.length; i++) {
                group.attachTab(a_tabs[i])
            }

            dactyl.echomsg("Create group with name `" + group.name + "'")
            this.endUpdate()
        },
        groupRow : function(group) {
                return [<>
                    <span highlight="Indicator" style="display: inline-block; width: 1.5em; text-align: center">
                        {group.indicator}
                    </span>
                    {group.guid}
                </>
                , <>{group.url}</>]
        },
        groupTabRow : function(tab) {
            return [
                <>
                    <span highlight="Indicator" style="display: inline-block; width: 1.5em; text-align: center">
                        {(tab._tPos == tabs.index()) ? '%' :
                            (tab._tPos == tabs.alternate._tPos ? '#' : '')}
                    </span>
                    {tab._tPos + ": " + tab.label}
                </>,
                tab.linkedBrowser.contentDocument.location.href
            ]
        },
        groupTabsTable : function(group, filter) {
            let plugin = dactyl.plugins.tabgroupsmanager
            let items = plugin.groupTabs(group, filter).map(plugin.groupTabRow)
            return <div highlight="Completions">
                { template.completionRow([group.name, ''], "CompTitle") }
                { template.map(items, function (item) template.completionRow(item, "CompItem"), null, 100) }
                </div>;
        },
        showGroups : function(filter) {
            let plugin = dactyl.plugins.tabgroupsmanager
            let group_items = this.groups.items.map(function(item) plugin.groupRow(item))
            let list = commandline.commandOutput(
                <div highlight="Completions">
                    { template.completionRow(['Group', 'Description'], "CompTitle") }
                    { template.map(group_items, function (item) template.completionRow([item[0], item[1]], "CompItem"), null, 100) }
                </div>);
            commandline.echo(list, commandline.HL_NORMAL, commandline.FORCE_MULTILINE);
        },
        showGroupTabs : function(filter) {
            let plugin = dactyl.plugins.tabgroupsmanager
            let items = this.currentGroup().tabsByFilter(filter).map(plugin.groupTabRow)
            let list = commandline.commandOutput(
                <div highlight="Completions">
                    { template.completionRow(['Tab', 'Url'], "CompTitle") }
                    { template.map(items, function (item) template.completionRow(item, "CompItem"), null, 100) }
                </div>);
            commandline.echo(list, commandline.HL_NORMAL, commandline.FORCE_MULTILINE);
        },
        showGroupedTabs : function(filter) {
            let plugin = dactyl.plugins.tabgroupsmanager
            let gs = plugin.groups.getItemsByFilter("").map(function(el) el.originalItem)
            let list = commandline.commandOutput(
                gs.map(function(group) plugin.groupTabsTable(group, filter)).reduce(template.add)
            )
            commandline.echo(list, commandline.HL_NORMAL, commandline.FORCE_MULTILINE);
        },
        selectPreviousGroup : function(count) {
            this.beginUpdate()
            if (count && (count > 0)) {
                this.getGroupByIndex(count - 1).select()
                // TODO в одно действие
                // for (var i = 0; i < count; i++)
                //     TabGroupsManager.allGroups.selectLeftGroup()
            } else {
                let prev = this.getPrevActiveGroup(plugins.tabgroupsmanager.group('%').index())
                TabGroupsManager.allGroups.selectNthGroup(prev)
            }
            this.endUpdate()
        },
        selectNextGroup : function(count) {
            this.beginUpdate()
            if (count && (count > 0)) {
                this.getGroupByIndex(count - 1).select()
                // TODO в одно действие
                // for (var i = 0; i < count; i++)
                //     TabGroupsManager.allGroups.selectRightGroup()
            } else {
                let next = this.getNextActiveGroup(plugins.tabgroupsmanager.group('%').index())
                TabGroupsManager.allGroups.selectNthGroup(next)
            }
            this.endUpdate()
        },
        currentGroup : function () {
            return new this.GroupProxy(TabGroupsManager.allGroups.selectedGroup.id)
        },
        selectGroupByName : function(name, special, reverse) {
            this.beginUpdate()
            this.lastFilter = name
            // let groups = this.groups.getItemsByFilter(name)
            let groups = this.groups.itemsByName(name)
            let group = null
            if (groups.length == 0)
                dactyl.echoerr("E: Group `" + name + "' not found");
            else {
                if (special) {
                    let index = -1
                    for (var i = 0; i < groups.length; i++)
                        if (groups[i].id == this.groups.current.id) {
                                index = i
                                break
                        }
                    if (index > -1) {
                        if (reverse)
                            group = groups[(groups.length + index - 1) % groups.length]
                        else
                            group = groups[(index + 1) % groups.length]
                    } else
                        group = groups[0]
                } else {
                    group = groups[0]
                }
            }
            if (group)
                TabGroupsManager.allGroups.selectedGroup = group.originalItem
            this.endUpdate()
        },
        selectFirstGroup : function() {
            this.beginUpdate()
            TabGroupsManager.allGroups.selectedGroup = TabGroupsManager.allGroups.firstChild.group
            this.endUpdate()
        },
        selectLastGroup : function() {
            this.beginUpdate()
            TabGroupsManager.allGroups.selectedGroup = TabGroupsManager.allGroups.lastChild.group
            this.endUpdate()
        },
        selectGroup : function(arg, special, count) {
            if (count > 0)
                this.getGroupByIndex(count - 1).select()
            else if (/^\d+$/.test(arg))
                this.getGroupByIndex(arg - 1).select()
            else if (special)
                this.selectGroupByName(arg.replace(/\d+: /, ""), true)
            else
                this.group(arg).select()
        },
        lastSleepingGroup : function() {
            return TabGroupsManager.sleepingGroups.store[TabGroupsManager.sleepingGroups.store.length - 1]
        },
        lastClosedGroup : function() {
            return TabGroupsManager.closedGroups.store[TabGroupsManager.closedGroups.store.length - 1]
        },
        lastRestorableGroup : function() {
            return this.lastSleepingGroup() || this.lastClosedGroup()
        },
        bookmarkAllGroups : function(folder) {
            this.beginUpdate()
            TabGroupsManager.allGroups.bookmarkAllGroups(folder)
            this.endUpdate()
        },
        clearGroupClosedList : function(args) {
            this.beginUpdate()
            TabGroupsManager.closedGroups.clear()
            this.endUpdate()
        },
        toggleGroupBar : function(args) {
            TabGroupsManager.groupBarDispHide.dispGroupBar = !TabGroupsManager.groupBarDispHide.dispGroupBar
            this.beginUpdate()
            this.endUpdate()
        },
        restoreLatestGroup : function(special) {
            this.beginUpdate()
            if (special) {
                TabGroupsManager.closedGroups.restoreLatestGroup()
            } else {
                TabGroupsManager.sleepingGroups.restoreLatestGroup()
            }
            this.endUpdate()
        },
        // }}}
    }
    // Return plugin module
    return plugin
})(); //}}}

dactyl.plugins.tabgroupsmanager.groups = new dactyl.plugins.tabgroupsmanager.Groups(),

// }}}

// ---------------------------
// User Command
// ---------------------------
// {{{

group.commands.add(['tabgr[oup]'], 'Select group',
    function(args){
        let special = args.bang;
        let count   = args.count;
        let arg     = args.literalArg;

        dactyl.plugins.tabgroupsmanager.selectGroup(arg, special, count)
    }, {
        bang: true,
        count: true,
        argCount: '?',
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_group(context),
        literal: 0
    }, true);

group.commands.add(['tabgroupc[reate]'], 'Create new group',
    function(args){
        let arg = args.literalArg
        let special = args.bang

        dactyl.plugins.tabgroupsmanager.createGroup([], [], arg, special)
    }, {
        argCount: '?',
        bang: true,
        literal: 0
    }, true);

//FIXME can't handle keywords
group.commands.add(['tabgroupo[pen]'], 'Open in new group',
    function(args){
        let arg = args.literalArg
        let special = args.bang
        let sep = RegExp(options['urlseparator'])
        let name = args['-name']

        //if (options.get("activate").has("all", "groupopen")) {
        //    special = !special;
        //}
        dactyl.plugins.tabgroupsmanager.createGroup(arg.split(sep) , [], name, special)
    }, {
        argCount: '?',
        bang: true,
        completer: function (context) completion.url(context, "slf"),
        literal: 0,
        privateData: true,
        options: [[["-name", "-n"], commands.OPTION_STRING]]
    }, true);

// TODO bang and option 'activate'
group.commands.add(['grouptabopen'], 'Open tab into group',
    function(args){
        let special = args.bang;
        let arg     = args.literalArg;
        let group_name   = args['-group']
        let sep = RegExp(options['urlseparator'])
        let urls = arg.split(sep)

        group = dactyl.plugins.tabgroupsmanager.group(group_name)

        if (group.id > 0) {
            if (special)
                group.loadUrls(urls)
            else {
                group.select()
                urls.map(function (url) dactyl.open(url, dactyl.NEW_TAB))
            }
        } else
            dactyl.echoerr("E: tab group not found");
    }, {
        bang: true,
        argCount: '?',
        completer: function (context) completion.url(context, "slf"),
        options: [[["-group", "-g"], commands.OPTION_STRING, null, dactyl.plugins.tabgroupsmanager.groupElements]],
        literal: 0
    }, true);

group.commands.add(['tabgroups'], 'Show groups',
    function(args){
        dactyl.plugins.tabgroupsmanager.showGroups(args.literalArg)
    }, {
        argCount: "?",
        literal: 0
    }, true);

group.commands.add(['tabgroupb[uffer]', 'groupt[ab]'], 'Buffer of group',
    function(args){
        dactyl.plugins.tabgroupsmanager.beginUpdate()

        let special = args.bang;
        let count   = args.count;
        let arg     = args.literalArg;
        // TODO let group = args["-group"]
        let group = TabGroupsManager.allGroups.selectedGroup;

        if (arg && count > 0)
            dactyl.echoerr("E488: Trailing characters");
        else if (count > 0)
            group.selectNthTabInGroup(count-1);
        else if (!arg && special)
            dactyl.plugins.tabgroupsmanager.group("").selectNextTab();
        else if (/^\d+$/.test(arg))
            group.selectNthTabInGroup(arg-1);
        else if (/^\d+:/.test(arg))
            group.selectNthTabInGroup(arg.match(/^\d+/)-1);
        else
            tabs.switchTo(arg, special);

        dactyl.plugins.tabgroupsmanager.endUpdate()
    }, {
        argCount: '?',
        bang: true,
        count: true,
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_groupTab(context),
        literal: 0,
        //options: [[["-group", "-g"], commands.OPTION_STRING, null, dactyl.plugins.tabgroupsmanager.groupElements]]
    }, true);

group.commands.add(['tabgroupbuffers', 'grouptabs'], 'Show buffers of group',
    function(args){
        dactyl.plugins.tabgroupsmanager.showGroupTabs(args.literalArg)
    }, {
        argCount: "?",
        literal: 0
    }, true);

group.commands.add(['tabgroupedb[uffer]', 'groupedt[ab]'], 'Buffer of group',
    function(args){
        dactyl.plugins.tabgroupsmanager.beginUpdate()

        let special = args.bang;
        let count   = args.count;
        let arg     = args.literalArg;

        if (arg && count > 0)
        {
            if (/^\d+$/.test(arg))
                tabs.switchTo(arg, special);
            else
                dactyl.echoerr("E488: Trailing characters");
        } else if (count > 0)
            tabs.switchTo(count.toString(), special);
        else
            tabs.switchTo(arg, special);

        dactyl.plugins.tabgroupsmanager.endUpdate()
    }, {
        argCount: '?',
        bang: true,
        count: true,
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_groupedTab(context),
        literal: 0,
    }, true);

group.commands.add(['tabgroupedbuffers', 'groupedtabs'], 'Show buffers grouped by active group',
    function(args){
        dactyl.plugins.tabgroupsmanager.showGroupedTabs("")
    }, {
        argCount: "?",
        literal: 0
    }, true);

group.commands.add(['tabgrouprel[oad]'], 'Reload group',
    function(args){
        dactyl.plugins.tabgroupsmanager.group(args.literalArg).reload()
    }, {
        argCount: '?',
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_group(context),
        literal: 0
    }, true);

group.commands.add(['tabgroupm[ove]', 'tgm[ove]'], 'Move group',
    function(args){
        let count = args.count
        let arg = args.literalArg
        let gcount = TabGroupsManager.allGroups.childNodes.length

        if (count > 0)
            dactyl.plugins.tabgroupsmanager.group('%').move(count, false)
        else if (/^[-+]\d+$/.test(arg))
            dactyl.plugins.tabgroupsmanager.group('%').move(parseInt(arg), false)
        else if (/^\d+$/.test(arg)) {
            if (parseInt(arg) < 1)
                dactyl.plugins.tabgroupsmanager.group('%').move(0, true)
            else if (parseInt(arg) > gcount)
                dactyl.plugins.tabgroupsmanager.group('%').move(gcount-1, true)
            else
                dactyl.plugins.tabgroupsmanager.group('%').move(parseInt(arg-1), true)
            } else {
                let g = dactyl.plugins.tabgroupsmanager.group(arg.replace(/^\d+: /,""))
            
                if (g.id > 0)
                    dactyl.plugins.tabgroupsmanager.group('%').move(g.index(), true)
            }
        }, {
        argCount: '?',
        count: true,
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_group(context),
        literal: 0
    }, true);

group.commands.add(['tabgroupp[revious]', 'tgp[revious]'], 'Previous group',
    function(args){
        dactyl.plugins.tabgroupsmanager.selectPreviousGroup()
    }, {
        argCount: '0',
    }, true);

group.commands.add(['tabgroupn[ext]', 'tgn[ext]'], 'Next group',
    function(args){
        dactyl.plugins.tabgroupsmanager.selectNextGroup()
    }, {
        argCount: '0',
    }, true);

group.commands.add(['tabgroupre[wind]'], 'Select first group',
    function(args){
        dactyl.plugins.tabgroupsmanager.group("0").select()
    }, {
        argCount: '0',
    }, true);

group.commands.add(['tabgroupl[ast]', 'gl[ast]'], 'Select last group',
    function(args){
        dactyl.plugins.tabgroupsmanager.group("$").select()
    }, {
        argCount: '0',
    }, true);

group.commands.add(['tabgroupdo', 'tgdo'], 'Execute a command in each group',
    function (args) {
        for (let i = 0; i < dactyl.plugins.tabgroupsmanager.groupCount(); i++) {
            dactyl.plugins.tabgroupsmanager.getGroupByIndex(i).select()
            dactyl.execute(args.string, null, true);
        }
    }, {
        argCount: '*',
        completer: function (context) completion.command(context)
    }, true);

group.commands.add(['tabgroupdu[plicate]', 'tgduplicate'], 'Duplicate current group',
    function (args) {
        let count = args.count || 1

        dactyl.plugins.tabgroupsmanager.groups.current.duplicate(count)
    }, {
        argCount: '0',
        count: true,
    }, true);

group.commands.add(['tabgroupbo[okmark]'], 'Bookmark group',
    function(args){
        dactyl.plugins.tabgroupsmanager.group(args.literalArg).bookmark()
    }, {
        argCount: '?',
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_group(context),
        literal: 0
    }, true);

group.commands.add(['tabgroupbookmarka[ll]'], 'Bookmark all group',
    function(args){
        dactyl.plugins.tabgroupsmanager.bookmarkAllGroups(args.literalArg)
    }, {
        argCount: '1',
        literal: 0
    }, true);

group.commands.add(['tabattachtog[roup]'], 'Attach the current tab to another group',
    function(args){
        let special = args.bang;
        let arg = args.literalArg

        if (arg) {
            if (/^\d+:.*$/.test(arg))
                var group = dactyl.plugins.tabgroupsmanager.group(arg.replace(/\d+: /, ""))
            else if (/^\d+$/.test(arg))
                var group = dactyl.plugins.tabgroupsmanager.getGroupByIndex(parseInt(arg)-1)
            else
                var group = dactyl.plugins.tabgroupsmanager.group(arg)
        
            if (group.id)
                group.attachTab(null)
            else
                dactyl.echoerr("E: Group `" + arg + "' not found");


        } else if (special)
            TabGroupsManager.allGroups.moveTabToGroupInSameWindow(gBrowser.mCurrentTab)
    },
    {
        argCount: '?',
        bang: true,
        count: false,
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_group(context),
        literal: 0
    }, true);

group.commands.add(['tabdetachtog[roup]'], 'Detach the current tab, and open it in its own group',
    function(args){
        let special = args.bang
        let arg = args.literalArg
        let tab = gBrowser.mCurrentTab
        let group = null

        if (arg!="")
            group = TabGroupsManager.allGroups.openNewGroupCore(null,arg)
        
        TabGroupsManager.allGroups.moveTabToGroupInSameWindow(tab,group,special)
    }, {
        argCount: '?',
        bang: true,
        count: false,
        literal: 0
    }, true);

//options: [[["-group", "-g"], commands.OPTION_STRING, null, dactyl.plugins.tabgroupsmanager.groupElements]],

group.commands.add(['tabgrouprename'], 'Rename group',
    function(args){
        dactyl.plugins.tabgroupsmanager.group('').setName(args.literalArg, args.bang)
    }, {
        argCount: '?',
        bang: true,
        literal: 0
    }, true);

group.commands.add(['tabgrouponly'], 'Sleep or close all other groups',
    function(args){
        dactyl.plugins.tabgroupsmanager.group('').group.deleteOtherGroups(args.bang)
    }, {
        argCount: '0',
        bang: true,
        literal: 0
    }, true);

group.commands.add(['tabgroupd[elete]', 'tabgroupclose'], 'Delete group',
    function(args){
        let special = args.bang;

        if (special)
            dactyl.plugins.tabgroupsmanager.group(args.literalArg).close()
        else
            dactyl.plugins.tabgroupsmanager.group(args.literalArg).closeAllTabsAndSelf()
    }, {
        argCount: '?',
        bang: true,
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_group(context),
        literal: 0,
    }, true);

group.commands.add(['tabgroupund[elete]'], 'Restore closed group',
    function(args){
        let ret = dactyl.plugins.tabgroupsmanager.restorableGroup(args.literalArg).unclose()
        if (ret)
            dactyl.echomsg("restored group with name `" + ret.name + "'", 9);
        else
            dactyl.echoerr("group not restored");
    }, {
        argCount: '1',
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_closedGroup(context),
        literal: 0,
    }, true);

group.commands.add(['tabgroupsl[eep]'], 'Sleep group',
    function(args){
        dactyl.plugins.tabgroupsmanager.group(args.literalArg).sleep()
    }, {
        argCount: '?',
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_group(context),
        literal: 0,
    }, true);

group.commands.add(['tabgroupunsl[eep]'], 'Restore sleeping group',
    function(args){
        let ret = dactyl.plugins.tabgroupsmanager.restorableGroup(args.literalArg).unsleep()
        if (ret)
            dactyl.echomsg("restored group with name `" + ret.name + "'", 9);
        else
            dactyl.echoerr("group not restored");
    }, {
        argCount: '1',
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_sleepingGroup(context),
        literal: 0,
    }, true);
group.commands.add(['tabgroupsu[spend]'], 'Suspend group',
    function(args){
        dactyl.plugins.tabgroupsmanager.group(args.literalArg).suspend()
    }, {
        argCount: '?',
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_group(context),
        literal: 0,
    }, true);

group.commands.add(['tabgroupunsu[spend]'], 'Restore suspended group',
    function(args){
        dactyl.plugins.tabgroupsmanager.group(args.literalArg).unsuspend()
    }, {
        argCount: '?',
        completer: function (context) dactyl.plugins.tabgroupsmanager.completion_suspendedGroup(context),
        literal: 0,
    }, true);

group.commands.add(['tabgroupr[estore]'], 'Restore group',
    function(args){
        let special = args.bang
        let res = dactyl.plugins.tabgroupsmanager.restorableGroup(args.literalArg).restore()

        if (res) {
            if (!special)
                res.select()
            dactyl.echomsg("restored group with name `" + res.name + "'");
        } else
            dactyl.echoerr("group not restored");
    }, {
        argCount: '1',
        bang: true,
        completer: function(context){
            let captions = ["Suspended Groups", "Sleeping Groups", "Closed Groups"]
            let functions = [
                function (context) plugin.completion_suspendedGroup(context),
                function (context) plugin.completion_sleepingGroup(context),
                function (context) plugin.completion_closedGroup(context)
            ]
            let plugin = dactyl.plugins.tabgroupsmanager
            context.fork.apply(context, [captions[0], 0, context, functions[0]])
            context.fork.apply(context, [captions[1], 0, context, functions[1]])
            context.fork.apply(context, [captions[2], 0, context, functions[2]])
        },
        literal: 0
    }, true);

group.commands.add(['tabgroupclosedlistclear'], 'Clear group closed list',
    function(args){
        dactyl.plugins.tabgroupsmanager.clearGroupClosedList()
    }, {
        argCount: '0',
    }, true);

group.commands.add(['tabgroupu[ndo]', 'tabgrouprestorel[ast]'], 'Restore last sleeping or closed group',
    function(args){
        dactyl.plugins.tabgroupsmanager.restoreLatestGroup(args.bang, args.count)
    }, {
        bang: true,
        count: true,
        argCount: '0',
    }, true);

group.commands.add(['tabgroupbartoggle'], 'Toogle group bar',
    function(args){
        dactyl.plugins.tabgroupsmanager.toggleGroupBar()
    }, {
        argCount: '0',
    }, true);

//TODO sort options
group.commands.add(['tabgroupsort'], 'Sort groups',
    function(args){
        dactyl.plugins.tabgroupsmanager.groups.sort()
    }, {
        argCount: '0',
    }, true);

// }}}

// ---------------------------
// Mapping
// ---------------------------
// {{{
//var myModes = config.browserModes;
//var groupKey = "x"
//var groupAltKey = "v"

var myModes = [modes.NORMAL]
var groupKey = options.tabgroupsmanager_group_key
var groupAltKey = options.tabgroupsmanager_group_alt_key

if (groupKey) {
    group.mappings.add(myModes, [groupKey],
        "Open one or more URLs in a new group",
        function () { CommandExMode().open("tabgroupopen "); });

    group.mappings.add(myModes, [groupKey.toUpperCase()],
        "Open one or more URLs in a new group, based on current location",
        function () { CommandExMode().open("tabgroupopen " + buffer.URL, modes.EX); });

    // TODO count reaction and move to class
    group.mappings.add(myModes, ["[" + groupKey, "g" + groupKey.toUpperCase()],
        "Switch to previous group",
        function (count) { dactyl.plugins.tabgroupsmanager.selectPreviousGroup(count) },
        { count: true });

    group.mappings.add(myModes, ["]" + groupKey, "g" + groupKey],
        "Switch to next group",
        function (count) { dactyl.plugins.tabgroupsmanager.selectNextGroup(count); },
        { count: true });
}

if (groupAltKey) {
    group.mappings.add(myModes, [groupAltKey + groupAltKey],
        "Go to the specified group from the group list.",
        function (count) {
            if (count && (count > 0)) {
                dactyl.plugins.tabgroupsmanager.getGroupByIndex(count - 1).select()
            } else {
                CommandExMode().open("tabgroup! ");
            }
        }, { count: true });

    group.mappings.add(myModes, [groupAltKey + "<Left>", groupAltKey + "h"],
        "Switch to previous group",
        function (count) { dactyl.plugins.tabgroupsmanager.selectPreviousGroup(count) },
        { count: true });

    group.mappings.add(myModes, [groupAltKey + "<Right>", groupAltKey + "l"],
        "Switch to next group",
        function (count) { dactyl.plugins.tabgroupsmanager.selectNextGroup(count); },
        { count: true });

    //FIXME
    group.mappings.add(myModes, ["g" + groupAltKey.toUpperCase()],
        "Switch to previous finded group",
        function (count) {
            if (count) {
                dactyl.plugins.tabgroupsmanager.getGroupByIndex(count - 1).select()
            } else {
                dactyl.plugins.tabgroupsmanager.selectGroupByName(dactyl.plugins.tabgroupsmanager.lastFilter, true, true)
            }
        }, { count: true });
    
    //FIXME
    group.mappings.add(myModes, ["g" + groupAltKey],
        "Switch to next finded group",
        function (count) {
            if (count && count < 0) {
                dactyl.plugins.tabgroupsmanager.getGroupByIndex(count - 1).select()
            } else {
                dactyl.plugins.tabgroupsmanager.selectGroupByName(dactyl.plugins.tabgroupsmanager.lastFilter, true, false)
            }
        }, { count: true });

    group.mappings.add(myModes, [groupAltKey + "t"],
        "Group tabopen",
        function () { CommandExMode().open("grouptabopen ");
        });
    
    //FIXME
    group.mappings.add(myModes, [groupAltKey + ":"],
        "Group command",
        function (count) { if (count > 0) CommandExMode().open(count + "tabgroup");
        }, { count: true });

    group.mappings.add(myModes, [groupAltKey.toUpperCase()],
        "Show group buffer list",
        function () { dactyl.plugins.tabgroupsmanager.showGroups("") });

    group.mappings.add(myModes, [groupAltKey + "b"],
        "Go to the specified buffer from the group buffer list.",
        function () {
           // if (count) {
           //    dactyl.plugins.tabgroupsmanager.group("").selectTab(count)
           // } else {
                CommandExMode().open("tabgroupbuffer! ");
           // }
        }
    );//, { count: true });
    group.mappings.add(myModes, [groupAltKey + "<"],
        "Move group to left",
        function ({count}) {
            if (!count)
                count = 1; 
            
            dactyl.plugins.tabgroupsmanager.group("%").move(-count)
        }, {count: true});

    group.mappings.add(myModes, [groupAltKey + ">"],
        "Move group to right",
        function ({count}) {
            if (!count)
                count = 1; 
            
            dactyl.plugins.tabgroupsmanager.group("%").move(count)
        }, {count: true});
    
    group.mappings.add(myModes, [groupAltKey + "B"],
        "Show group tabs",
        function () { dactyl.plugins.tabgroupsmanager.showGroupTabs("") });

    group.mappings.add(myModes, [groupAltKey + "r"],
        "Reload group",
        function () { dactyl.plugins.tabgroupsmanager.group().reload() });

    group.mappings.add(myModes, [groupAltKey + "c"],
        "Create group",
        function (count) { dactyl.plugins.tabgroupsmanager.createGroup([], [], "", true) },
        { count: true });

    group.mappings.add(myModes, [groupAltKey + "d"],
        "Close group",
        function () { dactyl.plugins.tabgroupsmanager.group().closeAllTabsAndSelf() });

    group.mappings.add(myModes, [groupAltKey + "D"],
        "Close group and select previous",
        function (count) { dactyl.plugins.tabgroupsmanager.group().closeAllTabsAndSelf(true) },
        { count: true });

    group.mappings.add(myModes, [groupAltKey + "s"],
        "Sleep group",
        function () { dactyl.plugins.tabgroupsmanager.group().suspend() },
        { count: false });

    group.mappings.add(myModes, [groupAltKey + "S"],
        "Sleep group",
        function () { dactyl.plugins.tabgroupsmanager.group().sleep() },
        { count: false });
    group.mappings.add(myModes, [groupAltKey + "u"],
        "Undo close last group",
        function () { dactyl.plugins.tabgroupsmanager.restoreLatestGroup(true) });
    
    group.mappings.add(myModes, [groupAltKey + "U"],
        "Restore group",
        function () { CommandExMode().open("tabgrouprestore ") });

    group.mappings.add(myModes, [groupAltKey + "k", groupAltKey + "<Up>", groupAltKey + "0", groupAltKey + "^"],
        "Switch to first group",
        function () { dactyl.plugins.tabgroupsmanager.selectFirstGroup() });

    group.mappings.add(myModes, [groupAltKey + "j", groupAltKey + "<Down>", groupAltKey + "$"],
        "Switch to last group",
        function () { dactyl.plugins.tabgroupsmanager.selectLastGroup() });

//    group.mappings.add(myModes, ["[" + groupAltKey],
//        "Switch to previous group",
//        function (count) { dactyl.plugins.tabgroupsmanager.selectPreviousGroup(count) },
//        { count: true });
//
//    group.mappings.add(myModes, ["]" + groupAltKey],
//        "Switch to next group",
//        function (count) { dactyl.plugins.tabgroupsmanager.selectNextGroup(count) },
//        { count: true });
}
// }}}

// ---------------------------
// Events
// ---------------------------
// {{{
statusline.updateTabCount = dactyl.plugins.tabgroupsmanager.updateTabCount
//}}}

//}}}

})(); } else
  dactyl.echoerr('TabGroups Manager is not installed')

// vim:sw=4 ts=4 et si fdm=marker:
