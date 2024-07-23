//インストラクションのコンポーネント

export const Instruction = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
      <main>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-center">チュートリアル</h1>
        </header>

        <p className="text-base leading-relaxed text-black">
          このゲームは風船を膨らませて、できるだけ多くのお金を稼ぐゲームです。
          「空気を入れる」ボタンで風船を膨らませれば膨らませるほど一時的にお金がたまり、破裂する前に「回収」ボタンを押すことでお金を獲得できます。
          しかし、風船を膨らませすぎて破裂させてしまった場合、一時的に貯めたお金は獲得できません。
        </p>
      </main>
    </div>
  );
};
