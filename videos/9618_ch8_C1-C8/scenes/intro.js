// S000 title and part list; S999 end card
scene('S000', 'S000', t => {
  txt('title', '9618 Chapter 8 Databases', W / 2, 230, { size: 80, weight: 700, align: 'center', alpha: A(t, T('S000')) });
  txt('title:zh', '第八章 数据库', W / 2, 305, { size: 44, align: 'center', color: COL.mute, alpha: A(t, T('S000', .3)) });
  const zh = ['文件方式的局限', '术语和键', '关系与 E-R 图', '规范化', 'DBMS 的功能', 'SQL 的数据定义', 'SQL 查询', '数据维护'];
  Object.keys(CONCEPTS).forEach((c, i) => {
    const a = A(t, S('S000', zh[i])), y = 380 + i * 56;
    txt('part:c' + i, c, 300, y + 34, { size: 32, weight: 700, color: COL.pk, alpha: a });
    const w = txt('part:n' + i, CONCEPTS[c][0], 380, y + 34, { size: 30, alpha: a });
    txt('part:z' + i, zh[i], 380 + w + 28, y + 34, { size: 30, color: COL.mute, alpha: a });
  });
  txt('part:q', '每部分最后：一道真题', W / 2, 880, { size: 34, weight: 700, align: 'center', alpha: A(t, S('S000', '真题')) });
});
scene('S999', 'S999', t => {
  txt('end', '9618 Chapter 8 Databases', W / 2, 470, { size: 72, weight: 700, align: 'center' });
  Object.keys(CONCEPTS).forEach((c, i) => {
    const x = W / 2 - 3.5 * 70 + i * 70;
    ctx.save(); ctx.fillStyle = COL.ink; ctx.beginPath(); ctx.arc(x, 580, 14, 0, 7); ctx.fill(); ctx.restore();
    txt('end:c' + i, c, x, 640, { size: 26, align: 'center', color: COL.mute });
  });
});
