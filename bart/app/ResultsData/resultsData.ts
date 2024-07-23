// 各風船のデータを表すインターフェースを定義
export interface ResultsData {
  earnings: number; // 獲得金額
  isBurst: boolean; // 破裂したかどうか
  pompsCount: number; // 膨らませた回数
}

// 全ての風船のデータを格納する配列を定義
let balloonsData: ResultsData[] = [];

// 各風船のデータを追加する関数
export const addResultsData = (
  earnings: number,
  isBurst: boolean,
  pompsCount: number
) => {
  balloonsData.push({ earnings, isBurst, pompsCount });
};

// 例: 風船データを追加
addResultsData(50, false, 10);
addResultsData(30, true, 5);

// すべての風船が終わった後にデータを送信する関数
function sendData() {
  // ここでデータを送信する処理を行う
  // 例: console.logを使用してデータを表示
  console.log(JSON.stringify(balloonsData));
}

// データ送信を呼び出す例
sendData();
