////////////////////////////
// Tests Application      

Config.appid = "Tests";
Config.version = "1";

function main() {
	Toolbar.setTitle('Upvise API Test Suite');
	List.addItem('Query Object', "testQuery()");
	List.addItem('List Object', "testList()");
	List.addItem('WebView Object', "testWebView()");
	List.addItem('App Object', "testApp()");
	List.addItem('Toolbar Object', "testToolbar()");
	List.addItem('Format Object', "testFormat()");
	List.addItem('History Object', "testHistory()");
	List.addItem('WebRequest Object', "testWebRequest()");
	
	List.addItem('List 500', 'list(500)');
	List.addItem('ListJSON 500', 'list2(500)');
	
	List.addItem('ListJSON 1000', 'list2(1000)');
	List.addItem('ListJSON 2000', 'list2(2000)');
	List.addItem('ListJSON 5000', 'list2(5000)');
	List.show(); 
}

function list(max) {
	var time1 = now();
	for (var i = 0; i < max; i++) {
		List.addItem("Record Item " + i, "App.alert({this.id})");
	}
	List.show();
	var time2 = now();
	App.alert(time2-time1 + "ms");
}


function list2(max) {
	var time1 = now();
	var items = new Array();
	for (var i = 0; i < max; i++) {
		//var id = "XXXXXXXXX" + i;
		//App.log("Item " + i);
		var item = new Object();
		item.id = "id" + i;
		item.onclick="App.alert(this.id)";
		item.label = "Record Item " + i;
		item.type = 0;
		items.push(item);
		//List.addItem("Record Item " + i, "viewItemDetails({id})");
	}
	//List.addItem("Done");
	List.addItems(JSON.stringify(items));
	List.show();
	var time2 = now();
	App.alert(time2-time1 + "ms");
}

function testQuery() {
	List.addItem('View Records', "viewList()", "number=" + Query.count("tasks"));
	List.addItem('View Records Optimized', "viewList2()", "number=" + Query.count("tasks"));
	List.addItem('Insert 100 Records', "insertRecords()");
	List.show();
}

function viewList() {
	var items = Query.select("tasks", "id;name", null, "name");
	
	Toolbar.setTitle(items.length +  " Records");
	for(var i = 0; i < items.length; i++) {
		List.addItem(items[i].name, "viewRecord({items[i].id})");
	}
	List.show("alpha");
}

function insertRecords() {
	var date = new Date(1973, 11, 3);
	var price = 49.567;
	for (var i=0; i< 100;i++) {
		var name = 'Task name ' + i;
		Query.insert("tasks", "name={name};phone='123 4244';status=1;startdate={date};price={price}");
	}
	History.reload();
	//Device.alert("Records Inserted");
}

/*
function viewList2() {
	Toolbar.setTitle("Contacts");
	Toolbar.setSearch(true);
	List.setStyle("alpha");
	Toolbar.addButton('', 'New Contact', 'newContact()');
	List.bindItems("id=${id};label=${name};onclick=viewContact(this.id)", "contacts", "id;name", null, "name");
	List.show();
}
*/

function newRecord() {
	var id = Query.insert("tasks", "name='New Task'");
	editRecord(id);
}

function viewRecord(id) {
	var task = Query.selectId("tasks", id);
	if (task == null) {
		//case when we do Delete in EditContact
		History.back();
		return;
	}
	Toolbar.setTitle("Contact Details");
	Toolbar.addButton("Edit Record", "editRecord({id})");
	//Toolbar.addButtonNextPrevious("alert('previous')", "alert('next')");
	List.addItem(task.name);
	List.addItemLabel("call phone", task.phone, "App.call(this.value)");
	List.addItemLabel('start date', Format.date(task.startdate));
	List.addItemLabel('price', Format.price(task.price, 'USD'));
	List.addItemLabel('status', task.status);
	List.show();
} 

function editRecord(id) {
	var task = Query.selectId("tasks", id);
	
	Toolbar.setStyle("edit");
	Toolbar.addButton("Delete", "deleteRecord({id})", "delete");
 	var onchange = "Query.updateId('tasks',{id},this.id,this.value)";
	List.addTextBox("name", "name", task.name, onchange);
	List.addTextBox("phone", "phone", task.phone, onchange, "phone");
	List.addTextBox("startdate", "start date", task.startdate, onchange, "date");
	List.addTextBox("status", "status", task.status, onchange, "numeric");
	List.addTextBox("price", "price", task.price, onchange, "decimal");
	List.show();
}

function deleteRecord(id) {
	Query.deleteId("tasks", id);
	History.back();
}

//////////////////////////////////////////////////////
//

function testList() {
	List.addHeader('Item');
	List.addItem('Simple Item'); 
	
	List.addHeader('Item with right icon');
	List.addItem('Icon Arow', null,'icon=bluearrow');
	List.addItem('Icon Checked', null,'icon=checked');
	List.addItem('Icon New', null,'icon=new');
	List.addItem('Icon Number', null,'number=123');
	
	List.addHeader('Item with left image');
	List.addItem('Stock Image Contact', null,'img=contact');
	List.addItem('Stock Image Sale', null,'img=sale');
	List.addItem('Image Url', null,'img=http://www.upvise.com/download/img/android.jpg');
	
	List.addHeader('Item with Label');
	List.addItemLabel('label', 'some value');
	List.addHeader('Item with Subtitle');
	List.addItemSubtitle('main text', 'some subtitle goes here. It can be very long and span multiple lines of text');
	List.addHeader('Image Item');
	List.addImage('http://www.upvise.com/img/mobile.png');
	List.addHeader("EditBox");
	List.addTextBox('', 'text', '', null);
	List.addTextBox('', 'long text', '', null, "textarea");
	List.addTextBox('', 'email', '', null, "email");
	List.addTextBox('', 'password', '' , null, "password");
	List.addTextBox('', 'number', '', null, "numeric");
	List.addTextBox('', 'price', '', null, "decimal");
	List.addTextBox('', 'date', new Date().getTime(), null, "date");
	List.addTextBox('', 'datesnooze', new Date().getTime(), null, "datesnooze");
	List.addTextBox('', 'time', new Date().getTime(), null, "time");
	List.addTextBox('', 'duration', 4, null, "duration");
	
	List.addHeader("Button");
	List.addButton('Hello', "alert('You clicked me!')");
	
	List.addHeader("ComboBox");
	List.addComboBox('comboid', 'priority', '1', null, '1:Low|2:Normal|3:High');
	options = [];
	for (var i = 0; i < 100; i++) options.push('' + i + ': Item ' + i);
	List.addComboBox('comboid', 'contact', '', null, options.join('|'));
	List.addComboBoxMulti('comboid', 'multi contacts', '', null, options.join('|'));
	List.addHeader("CheckBox");
	List.addCheckBox('id', 'Task Completed', true);
	
	List.addHeader("Optimization");
	
	List.show();
}

function testWebView() {
	List.addItemLabel('Local HTML content', 'WebView.showHtml(html, header)', 'webView1()');
	List.addItemLabel('Web Site URL', 'WebView.setUrl(url)', 'webView2()');
	List.addItemLabel('Image Viewer', 'WebView.showImageUrl(imageurl)', 'webView3()');
	List.show();
}

function webView1() {
	WebView.showHtml('<h1>My Title</h1><p>content goes here</h1>', 'header');
}

function webView2() {
	WebView.show('http://news.google.com');
}

function webView3() {
	WebView.showImage('http://www.upvise.com/img/upvise_cloud3.jpg');
}

//////////////////////////////

function testApp() {
	List.addItemLabel('call phone', 'App.call(phone)', "App.call('9001 9523')");
	List.addItemLabel('send sms', 'App.sms(phone)', "App.sms('9001 9523')");
	List.addItemLabel('compose email', 'App.mailto(email)', "App.mailto('tbrethes@gmail.com')");
	List.addItemLabel('start Web browser', 'App.web(url)', "App.web('http://www.upvise.com')");
	List.addItemLabel('start Map Viewer', 'App.map(address)', "App.map('Eiffel Tower, Paris, France')");
	List.addItemLabel('start Map Viewer geo', 'App.map(search, geo)', "App.map('Roma', '41.910453,12.498322')");
	List.addItemLabel('start YouTube Video', 'App.video(youtubeid)', "App.video('UF8uR6Z6KLc')");
	List.addItemLabel('import Contacts', 'App.importContacts()', "App.importContacts()");
	List.addItemLabel('export Contacts', 'App.exportContacts()', "App.exportContacts()");
	List.addItemLabel('take Picture', 'App.takePicture(callback)', "App.takePicture('myfunction()')");
	//List.addItemLabel('get Current GPS Location', 'App.getLocation()', "alert(App.getLocation())");
	List.show();
}

///////////////////////////

function testToolbar() {
	List.addItemLabel('Toolbar Title', 'Toolbar.setTitle(title)', 'testToolbarTitle()');
	List.addItemLabel('Toolbar Button', 'Toolbar.addButton(id, title, onclick)', 'testToolbarButton()');
	List.addItemLabel('Toolbar Search Mode', "Toolbar.setStyle('search')", 'testToolbarSearch()');
	List.addItemLabel('Toolbar Edit Mode', "Toolbar.setStyle('edit')", 'testToolbarEdit()');
	List.addHeader("Button icon");
	List.addItemLabel('Toolbar Button New', 'Toolbar.addButton(id, title, onclick, "new")', 'testToolbarNew()');
	List.addItemLabel('Toolbar Button Edit', 'Toolbar.addButton(id, title, onclick, "edit")', 'testToolbarEdit()');
	List.addItemLabel('Toolbar Button Delete', 'Toolbar.addButton(id, title, onclick, "delete")', 'testToolbarDelete()');
	List.addItemLabel('Toolbar Button Share', 'Toolbar.addButton(id, title, onclick, "share")', 'testToolbarShare()');
	List.show();
}

function testToolbarTitle() {
	Toolbar.setTitle('My Toolbar Title it can be very long ssss sss  sss ');
	List.show();
}

function testToolbarButton() {
	Toolbar.addButton('New Contact', "alert('Hi')", "new");
	Toolbar.addButton('Edit Contact', "alert('Hi Edit')", "edit");
	Toolbar.addButton('Share Contact', "alert('Hi Share')", "share");
	Toolbar.addButton('Delete Contact', "alert('Hi Delete')", "delete");
	WebView.showHtml('The first Button is displayed on the toolbar, other buttons are displayed in the Android menu.');
}

function testToolbarNew() {
	Toolbar.addButton('New Contact', "alert('Hi')", "new");
	List.show();
}

function testToolbarEdit() {
	Toolbar.addButton('Edit Contact', "alert('Hi')", "edit");
	List.show();
}

function testToolbarDelete() {
	Toolbar.addButton('Delete Contact', "confirm('Are you sure?')", "delete");
	List.show();
}

function testToolbarShare() {
	Toolbar.addButton('Share Contact', "alert('Hi')", "share");
	List.show();
}

function testToolbarSearch() {
	var names = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'And beyond'];
	Toolbar.setTitle('Search Mode');
	Toolbar.setStyle("search");
	for (var i = 0; i < names.length; i++) {
		List.addItem(names[i]);
	}
	List.show();
}

function testToolbarEdit() {
	Toolbar.setTitle('Edit Mode');
	Toolbar.setStyle("edit");
	List.addTextBox('name', 'name', 'Steve Jobs');
	List.addTextBox('title', 'job title', 'visionary');
	List.show();
}

////////////////////////////////////

function testFormat() {
	var date = new Date(1986, 1, 05, 11, 06, 30).getTime();
	var minutes = 123;
	List.addItemLabel(Format.date(date), "Format.date(aDate)");
	List.addItemLabel(Format.time(date), "Format.time(aDate)");
	List.addItemLabel(Format.month(date), "Format.month(aDate)");
	List.addItemLabel(Format.age(date), "Format.age(birthdate)");
	List.addItemLabel(Format.duration(minutes), "Format.duration(minutes)");
	List.addItemLabel(Format.frequency(30), "Format.frequency(minutes)");
	List.addItemLabel(Format.address('1 Duchess rd', 'Smallville', '268707', 'Ilinois', 'USA'), "Format.address(street, city, zipcode, state, country)");
	List.addItemLabel(Format.price(134.6), "Format.price(amount)");
	List.addItemLabel(Format.price(245.653, 'USD'), "Format.price(amount, currency)");
	List.show();
}

function testHistory() {
    List.addItem("History.back()", "History.back()");
    List.addItem("History.reload()", "History.reload()");
    List.show();
}

function testWebRequest() {
	List.addItem("Yahoo RSS Feed", "testRss()");
	List.show();
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}


var channel = null;

function testRss() {
	var url = "http://news.yahoo.com/rss/us";
	channel = Query.rss(url);
	if (channel == null) {
	} else {
		Toolbar.setTitle(channel.title.trim());
		
		for (var i = 0; i < channel.items.length;i++) {
			var item = channel.items[i];
			List.addItemSubtitle(item.title, Format.text(item.description), "showDetails({i})");
		}
	}
	List.show();
}

function showDetails(index) {
	if (channel == null) return;
	var item = channel.items[index];
	Toolbar.setTitle("News Details");
	WebView.showHtml(item.description, item.pubDate);
}
