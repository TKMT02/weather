const original_URL = "https://www.jma.go.jp/bosai/forecast/data/forecast/";

// 変更する場所を取得
const location_name = document.querySelector("#location_name");
const now_date = document.querySelector("#date");
const today_weather = document.getElementById("today_weather");
const today_icon = document.getElementById("today_icon");
const today_temp_max = document.getElementById("today_temp_max");
const today_temp_min = document.getElementById("today_temp_min");
const weekly_forecast = document.querySelector(".forecast-container");  // 週間天気予報を表示する部分

// アイコンのマッピング
const weatherIcons = {
    "晴れ": "image/100.png",
    "曇り": "image/200.png",
    "雨": "image/300.png",
    "雪": "image/400.png",
    "くもり": "image/200.png",
    "ふぶき": "image/400.png"
};

// 今日から3日間の天気を取得する関数
async function fetchData(location){
    const URL = original_URL + location + ".json";
    const res = await fetch(URL);
    const result = await res.json();
    
    // 今日の天気
    const today = result[0].timeSeries[0].areas[0];
    location_name.textContent = today.area.name;

    // 今日の日付の表示
    const date = new Date();
    now_date.textContent = `${date.getMonth() + 1}月${date.getDate()}日（${['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}）`;

    // 今日の天気
    today_weather.textContent = today.weathers[0];
    today_icon.src = weatherIcons[today.weathers[0]] || "image/100.png";  // アイコンの設定（マッピングにない場合は別のアイコンを使用）
    today_temp_max.textContent = result[1].timeSeries[1].areas[0].tempsMax[0] + "°C";
    today_temp_min.textContent = result[1].timeSeries[1].areas[0].tempsMin[0] + "°C";

    // 今日から3日間の天気予報
    const dailyData = result[1].timeSeries[0]; // 3日間の天気データ

    weekly_forecast.innerHTML = '';  // 前回のデータをクリア
    dailyData.timeDefines.forEach((time, index) => {
        // 3日間分のデータを取得するロジック
        if(index >= 0 && index <= 2) {  // 今日から3日間分
            const day = new Date(time);
            const dayName = ['日', '月', '火', '水', '木', '金', '土'][day.getDay()];
            const maxTemp = result[1].timeSeries[1].areas[0].tempsMax[index];
            const minTemp = result[1].timeSeries[1].areas[0].tempsMin[index];
            const weather = result[0].timeSeries[0].areas[0].weathers[index];

            // 3日間の天気のカード作成
            const card = document.createElement("div");
            card.classList.add("forecast-card");
            
            card.innerHTML = `
                <p>${dayName}</p>
                <img src="${weatherIcons[weather] || 'image/100.png'}" alt="${weather}" class="forecast-icon">
                <p>${maxTemp}°C / ${minTemp}°C</p>
            `;
            
            weekly_forecast.appendChild(card);
        }
    });
}

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
