
/**************************
    セッション情報の取得
 **************************/
var sessionInfo1 =
{
    "serverComputerName": "開発サーバーWin2019",
    "sessions": [
        {
            "clientUserName": "",
            "clientComputerName": "YamadaDesktopPC",
            "serverUserName": "DevelopUser1",
            "idleTime": 123,
            "loginTime": "2022-01-02T13:09:12.015+09:00"
        },
        {
            "clientUserName": "",
            "clientComputerName": "YamadaNotePC",
            "serverUserName": "DevelopUser2",
            "idleTime": 133,
            "loginTime": "2022-01-02T13:09:12.015+11:00"
        }
    ]
};

var sessionInfo2 = 
{
    "serverComputerName": "BAA2",
    "sessions": [

    ]
};

var sessionInfo3 = 
{
    "serverComputerName": "開発サーバーWin2020",
    "sessions":[
        {
            "clientComputerName": "SuzukiNotePC1",
            "serverUserName": "DevelopUser3",
            "idleTime": 41,
            "loginTime": "2022-01-02T13:09:12.015+10:10"
        },
        {
            "clientComputerName": "SuzukiNotePC2",
            "idleTime": 42,
            "loginTime": "2022-01-02T13:09:12.015+10:20"
        },
        {
            "clientComputerName": "SuzukiNotePC3",
            "serverUserName": "DevelopUser3",
            "idleTime": 43,
            "loginTime": "2022-01-02T13:09:12.015+10:30"
        }
    ]
};

var sessionInfo4 =
{
    "serverComputerName": "AGA3",
    "sessions": [
        {
            "clientComputerName": "YamadaDesktopPC",
            "serverUserName": "DevelopUser1",
            "idleTime": 3801,
            "loginTime": "2022-01-02T13:09:12.015+09:00"
        }
    ]
};

var sessionInfo5 = 
{
    "serverComputerName": "AAA4",
    "sessions": [

    ]
};

var sessionInfoList =
[
    sessionInfo4,
    sessionInfo3,
    sessionInfo1,
    sessionInfo2,
    sessionInfo5
];


/**************************
    データの整形
 **************************/
// 接続先のコンピュータ名でソート
sessionInfoList.sort(function(a,b) {
    if(a.serverComputerName < b.serverComputerName) return -1;
    if(a.serverComputerName > b.serverComputerName) return 1;
    return 0;
});



/**************************
    セッション情報の表示
 **************************/
// タイトル
const section = document.querySelector('section');
const title = document.createElement('h1');
title.textContent = "SSD接続状況一覧"
section.appendChild(title);

// 表形式で表示
const table = document.createElement('table');
var tableBody = document.createElement("tbody");

// ヘッダー
const row_Header = document.createElement('tr');
var headerWordList = ["Server", "User", "Login Computer", "Server User", "Last Login Time", "Idle During"]
for(let i = 0; i < headerWordList.length; i++) {
    const th = document.createElement('th');
    th.textContent = headerWordList[i];
    row_Header.appendChild(th);
}
tableBody.appendChild(row_Header);

// 各PCのセッション情報
sessionInfoList.forEach((sessionInfo) => {

    var sessionCount = 0;
    sessionInfo.sessions.forEach(session => {
        sessionCount++;
        var row_Data = document.createElement('tr');

        const data_1 = document.createElement('td');
        data_1.textContent = convertPrintString(sessionInfo.serverComputerName, "String");
        if(sessionCount >= 2) {
            data_1.setAttribute("id", "duplication_" + sessionInfo.serverComputerName + "_" + sessionCount);
        }

        const data_2 = document.createElement('td');
        data_2.textContent = convertPrintString(session.clientUserName, "String");

        const data_3 = document.createElement('td');
        data_3.textContent = convertPrintString(session.clientComputerName, "String");

        const data_4 = document.createElement('td');
        data_4.textContent = convertPrintString(session.serverUserName, "String");

        const data_5 = document.createElement('td');
        data_5.textContent = convertPrintString(session.loginTime, "Date");

        const data_6 = document.createElement('td');
        data_6.textContent = convertPrintString(session.idleTime, "Second");

        row_Data.appendChild(data_1);
        row_Data.appendChild(data_2);
        row_Data.appendChild(data_3);
        row_Data.appendChild(data_4);
        row_Data.appendChild(data_5);
        row_Data.appendChild(data_6);

        row_Data.style.fontWeight = "bold";
        tableBody.appendChild(row_Data);
    });
    if(sessionCount == 0) {
        var row_Data = document.createElement('tr');
        const data_1 = document.createElement('td');
        data_1.textContent = sessionInfo.serverComputerName;
        row_Data.appendChild(data_1);
        tableBody.appendChild(row_Data);
    }
});

table.appendChild(tableBody);
section.appendChild(table);


/**************************
    汎用メソッド
 **************************/
function dateFormat(date) {
    var yyyy = date.getFullYear();
    var MM = (date.getMonth() + 1).toString().padStart(2, "0");
    var dd = date.getDate().toString().padStart(2, "0");
    var HH = date.getHours().toString().padStart(2, "0");
    var mm = date.getMinutes().toString().padStart(2, "0");
    var ss = date.getSeconds().toString().padStart(2, "0");
    return yyyy + "/" + MM + "/" + dd + " " + HH + ":" + mm + ":" + ss;
}

function secondFormat(s) {
    var hour = Math.floor(s / (60 * 60)).toString().padStart(2, "0");
    var minute = Math.floor((s % (60 * 60)) / 60).toString().padStart(2, "0");
    var second = ((s % (60 * 60)) % 60).toString().padStart(2, "0")
    return hour + ":" + minute + ":" + second;
}

function convertPrintString(obj, convert) {
    if (obj) {
        switch(convert) {
            case "String":
                return obj;
            case "Date":
                return dateFormat(new Date(obj));
            case "Second":
                return secondFormat(obj);
            default:
                return obj;
        }
    } else {
        return "-";
    }
}