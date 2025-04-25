//インストラクションのコンポーネント

export const Instruction = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mt-8">
      <main>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-center text-black">
            チュートリアル
          </h1>
        </header>

        <p className="text-lg leading-relaxed text-black">
          このゲームは風船を膨らませて、できるだけ多くのお金を稼ぐゲームです。
          「空気を入れる」ボタンで風船を膨らませれば膨らませるほど一時的にお金がたまり、破裂する前に「回収」ボタンを押すことでお金を獲得できます。
          しかし、風船を膨らませすぎて破裂させてしまった場合、一時的に貯めたお金は獲得できません。
        </p>
        {/* <p className="text-lg leading-relaxed text-black mt-1">
          10個の風船が終わるたびに総得点を
          <span className="text-red-500 font-semibold">2倍</span>
          にすることができる「ダブルチャンス」があります。「挑戦」を選択した場合一定の確率で総得点が
          <span className="text-red-500 font-semibold">2倍</span>か
          <span className="text-red-500 font-semibold">1/2倍</span>になります。
          また、「辞退」を選択すると総得点はそのままになります。
        </p> */}
        <p className="text-lg leading-relaxed text-red-500 mt-1">
          リロードしてしまうとプレイデータが消えて最初からやり直しになってしまうので気をつけてください。
        </p>
        {/* <p className="text-lg leading-relaxed text-black mt-1">
          準備ができたら、「ゲーム開始」を押す前にEmpaticaの横のボタンを長押しして振動と共に✔︎がつくのを確認し開始してください。
        </p> */}
      </main>
    </div>
  );
};
