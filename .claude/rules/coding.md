# コーディングルール

- any型を使わない。不明な型はunknownを使う
- コンポーネントは1ファイル300行以内を目安にする
- Server Actionsにはactionという接尾辞をつける（例: createChoreLogAction）
- Supabaseのエラーはconsole.errorではなくthrowして呼び出し元で処理する
- コメントは「何をしているか」ではなく「なぜそうしているか」を書く
