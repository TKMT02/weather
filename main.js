const original_URL = "https://www.jma.go.jp/bosai/forecast/data/forecast/";


// 変更する場所を取得
const location_name = document.querySelector("#location_name");
const now_date = document.querySelector("#date");
const today_weather = document.getElementById("today_weather");
const today_icon = document.getElementById("today_icon");
const today_temp_max = document.getElementById("today_temp_max");
const today_temp_min = document.getElementById("today_temp_min");
const weekly_forecast = document.querySelector(".forecast-container");  // 週間天気予報を表示する部分
const imageURL = "https://www.jma.go.jp/bosai/forecast/img";
const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

const weatherData =
{
    "100": {
        "weather": "晴"
    },
    "101": {
        "weather": "晴時々曇"
    },
    "102": {
        "weather": "晴一時雨"
    },
    "103": {
        "weather": "晴時々雨"
    },
    "104": {
        "weather": "晴一時雪"
    },
    "105": {
        "weather": "晴時々雪"
    },
    "106": {
        "weather": "晴一時雨か雪"
    },
    "107": {
        "weather": "晴時々雨か雪"
    },
    "108": {
        "weather": "晴一時雨か雷雨"
    },
    "110": {
        "weather": "晴後時々曇"
    },
    "111": {
        "weather": "晴後曇"
    },
    "112": {
        "weather": "晴後一時雨"
    },
    "113": {
        "weather": "晴後時々雨"
    },
    "114": {
        "weather": "晴後雨"
    },
    "115": {
        "weather": "晴後一時雪"
    },
    "116": {
        "weather": "晴後時々雪"
    },
    "117": {
        "weather": "晴後雪"
    },
    "118": {
        "weather": "晴後雨か雪"
    },
    "119": {
        "weather": "晴後雨か雷雨"
    },
    "120": {
        "weather": "晴朝夕一時雨"
    },
    "121": {
        "weather": "晴朝の内一時雨"
    },
    "122": {
        "weather": "晴夕方一時雨"
    },
    "123": {
        "weather": "晴山沿い雷雨"
    },
    "124": {
        "weather": "晴山沿い雪"
    },
    "125": {
        "weather": "晴午後は雷雨"
    },
    "126": {
        "weather": "晴昼頃から雨"
    },
    "127": {
        "weather": "晴夕方から雨"
    },
    "128": {
        "weather": "晴夜は雨"
    },
    "130": {
        "weather": "朝の内霧後晴"
    },
    "131": {
        "weather": "晴明け方霧"
    },
    "132": {
        "weather": "晴朝夕曇"
    },
    "140": {
        "weather": "晴時々雨で雷を伴う"
    },
    "160": {
        "weather": "晴一時雪か雨"
    },
    "170": {
        "weather": "晴時々雪か雨"
    },
    "181": {
        "weather": "晴後雪か雨"
    },
    "200": {
        "weather": "曇"
    },
    "201": {
        "weather": "曇時々晴"
    },
    "202": {
        "weather": "曇一時雨"
    },
    "203": {
        "weather": "曇時々雨"
    },
    "204": {
        "weather": "曇一時雪"
    },
    "205": {
        "weather": "曇時々雪"
    },
    "206": {
        "weather": "曇一時雨か雪"
    },
    "207": {
        "weather": "曇時々雨か雪"
    },
    "208": {
        "weather": "曇一時雨か雷雨"
    },
    "209": {
        "weather": "霧"
    },
    "210": {
        "weather": "曇後時々晴"
    },
    "211": {
        "weather": "曇後晴"
    },
    "212": {
        "weather": "曇後一時雨"
    },
    "213": {
        "weather": "曇後時々雨"
    },
    "214": {
        "weather": "曇後雨"
    },
    "215": {
        "weather": "曇後一時雪"
    },
    "216": {
        "weather": "曇後時々雪"
    },
    "217": {
        "weather": "曇後雪"
    },
    "218": {
        "weather": "曇後雨か雪"
    },
    "219": {
        "weather": "曇後雨か雷雨"
    },
    "220": {
        "weather": "曇朝夕一時雨"
    },
    "221": {
        "weather": "曇朝の内一時雨"
    },
    "222": {
        "weather": "曇夕方一時雨"
    },
    "223": {
        "weather": "曇日中時々晴"
    },
    "224": {
        "weather": "曇昼頃から雨"
    },
    "225": {
        "weather": "曇夕方から雨"
    },
    "226": {
        "weather": "曇夜は雨"
    },
    "228": {
        "weather": "曇昼頃から雪"
    },
    "229": {
        "weather": "曇夕方から雪"
    },
    "230": {
        "weather": "曇夜は雪"
    },
    "231": {
        "weather": "曇海上海岸は霧か霧雨"
    },
    "240": {
        "weather": "曇時々雨で雷を伴う"
    },
    "250": {
        "weather": "曇時々雪で雷を伴う"
    },
    "260": {
        "weather": "曇一時雪か雨"
    },
    "270": {
        "weather": "曇時々雪か雨"
    },
    "281": {
        "weather": "曇後雪か雨"
    },
    "300": {
        "weather": "雨"
    },
    "301": {
        "weather": "雨時々晴"
    },
    "302": {
        "weather": "雨時々止む"
    },
    "303": {
        "weather": "雨時々雪"
    },
    "304": {
        "weather": "雨か雪"
    },
    "306": {
        "weather": "大雨"
    },
    "308": {
        "weather": "雨で暴風を伴う"
    },
    "309": {
        "weather": "雨一時雪"
    },
    "311": {
        "weather": "雨後晴"
    },
    "313": {
        "weather": "雨後曇"
    },
    "314": {
        "weather": "雨後時々雪"
    },
    "315": {
        "weather": "雨後雪"
    },
    "316": {
        "weather": "雨か雪後晴"
    },
    "317": {
        "weather": "雨か雪後曇"
    },
    "320": {
        "weather": "朝の内雨後晴"
    },
    "321": {
        "weather": "朝の内雨後曇"
    },
    "322": {
        "weather": "雨朝晩一時雪"
    },
    "323": {
        "weather": "雨昼頃から晴"
    },
    "324": {
        "weather": "雨夕方から晴"
    },
    "325": {
        "weather": "雨夜は晴"
    },
    "326": {
        "weather": "雨夕方から雪"
    },
    "327": {
        "weather": "雨夜は雪"
    },
    "328": {
        "weather": "雨一時強く降る"
    },
    "329": {
        "weather": "雨一時みぞれ"
    },
    "340": {
        "weather": "雪か雨"
    },
    "350": {
        "weather": "雨で雷を伴う"
    },
    "361": {
        "weather": "雪か雨後晴"
    },
    "371": {
        "weather": "雪か雨後曇"
    },
    "400": {
        "weather": "雪"
    },
    "401": {
        "weather": "雪時々晴"
    },
    "402": {
        "weather": "雪時々止む"
    },
    "403": {
        "weather": "雪時々雨"
    },
    "405": {
        "weather": "大雪"
    },
    "406": {
        "weather": "風雪強い"
    },
    "407": {
        "weather": "暴風雪"
    },
    "409": {
        "weather": "雪一時雨"
    },
    "411": {
        "weather": "雪後晴"
    },
    "413": {
        "weather": "雪後曇"
    },
    "414": {
        "weather": "雪後雨"
    },
    "420": {
        "weather": "朝の内雪後晴"
    },
    "421": {
        "weather": "朝の内雪後曇"
    },
    "422": {
        "weather": "雪昼頃から雨"
    },
    "423": {
        "weather": "雪夕方から雨"
    },
    "425": {
        "weather": "雪一時強く降る"
    },
    "426": {
        "weather": "雪後みぞれ"
    },
    "427": {
        "weather": "雪一時みぞれ"
    },
    "450": {
        "weather": "雪で雷を伴う"
    }
}

// 今日から3日間の天気を取得する関数
async function fetchData(location) {
    const URL = original_URL + location + ".json";
    const res = await fetch(URL);
    const result = await res.json();

    console.log(result);

    //  一週間の日付を取得
    const date_list = result[1].timeSeries[0].timeDefines;
    console.log(date_list);

    //  気温の方の一番最初に取得した場所の取得
    const get_location = result[0].timeSeries[2].areas[0].area.name;
    console.log(get_location);

    //  一週間のウェザーコードの取得
    const get_weatherCodes = result[1].timeSeries[0].areas[0].weatherCodes;
    console.log(get_weatherCodes);

    //  気温（今日）
    const get_today_temp = result[0].timeSeries[2].areas[0].temps;
    console.log(get_today_temp);

    //  一週間の最低気温
    const get_temp_min = result[1].timeSeries[1].areas[0].tempsMin;
    console.log(get_temp_min);

    //  一週間の最高気温
    const get_temp_max = result[1].timeSeries[1].areas[0].tempsMax;
    console.log(get_temp_max);

    console.log("-----------------------------------------------------------");

    let dateList = [];

    //  Day1の情報 
    dateList.push([date_list[0], daysOfWeek[new Date(date_list[0]).getDay()], new Date(date_list[0]).getDate(), weatherData[get_weatherCodes[0]].weather, get_weatherCodes[0], get_today_temp[0], get_today_temp[1]]);


    for (let i = 1; i < 4; i++) {
        dateList.push([date_list[i], daysOfWeek[new Date(date_list[i]).getDay()], new Date(date_list[i]).getDate(), weatherData[get_weatherCodes[i]].weather, get_weatherCodes[i], get_temp_max[i], get_temp_min[i]]);
        // console.log(dateList);
    }

    console.log(dateList);

    const today = new Date();
    const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

    const month = months[today.getMonth()];
    const date = today.getDate();
    const weekday = daysOfWeek[today.getDay()];

    location_name.textContent = get_location;
    now_date.textContent = `${month}${date}日（${weekday}）`;

    today_weather.textContent = dateList[0][3];

    today_icon.src = `${imageURL}/${dateList[0][4]}.svg`;
    today_icon.alt = `${dateList[0][3]}`;

    today_temp_max.textContent = `${dateList[0][5]}°C`;
    today_temp_min.textContent = `${dateList[0][6]}°C`;


    weekly_forecast.innerHTML = '';  // 前回のデータをクリア
    //  表示する
    for (let i = 1; i < 4; i++) {
        // 3日間の天気のカード作成
        const card = document.createElement("div");
        card.classList.add("forecast-card");

        card.innerHTML = `
            <p>${dateList[i][1]}</p>
            <img src="${imageURL}/${dateList[i][4]}.svg" alt="${dateList[i][3]}" class="forecast-icon">
            <p>${dateList[i][3]}</p>
            <p>${dateList[i][5]}°C / ${dateList[i][6]}°C</p>
        `;

        weekly_forecast.appendChild(card);
    };

};

// 初期表示
window.addEventListener("DOMContentLoaded", () => {
    const location_number = document.getElementById("region-select").value;
    fetchData(location_number);
});

// ボタンクリックで場所を設定
const button = document.querySelector(".search-button");

button.addEventListener("click", () => {
    const location_number = document.getElementById("region-select").value;
    fetchData(location_number);
});
