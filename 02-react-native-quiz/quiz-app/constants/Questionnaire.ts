export type QuestionnaireItemType = {
  id: number;
  title: string;
  answers: string[];
};

// ****** FIRST ANSWER ALWAYS BE THE CORRECT ANSWER ******
export const Questionnaire: QuestionnaireItemType[] = [
  {
    id: 1,
    title:
      "ออสซี่ปักขคณนา เชฟ ว้าวบ็อกซ์ แรงใจ แฟรีฮาราคีรี ฟลุทเย้ว สุริยยาตรเฮอร์ริเคนวอลล์สจ๊วต เทรดทีวีธรรมาฟลุกคอมเมนต์ ?",
    answers: [
      "ตุ๊ดแชมเปญสติ๊กเกอร์คลิปโบว์ลิ่ง เทรนด์สะกอม.",
      "ทับซ้อนหมั่นโถวซังเตภควัมบดี เฮียเซอร์ไพรส์คอนเทนเนอร์บาร์บี้ รามาธิบดีความหมายสโรชาวิกจีดีพี",
      "เซอร์ไนท์อีแต๋น ฟอร์มผลไม้ เพาเวอร์เอาท์ดอร์พาร์",
      "แจ๊กเก็ต อัปเกรดกบฎเดชานุภาพ บอแรกซ์เวอร์ชวลพระตะบองลบหลู่นครพนม",
    ],
  },
  {
    id: 2,
    title: "แอดมิชชั่นแม่ค้าแบตกรุ๊ป หงวนยากูซ่าสเตอริโอแพทเทิร์น นายพราน ?",
    answers: [
      "จิตเภทซาร์ วีไอพีแอสเตอร์นอร์ทโรแมนติค.",
      "ริกเตอร์คำสาปคูลเลอร์ เอ๋อเอเซียแมคเคอเรล บูติกโปรเจคท์พุทโธวาฟเฟิล",
      "วาไรตี้เมจิก สจ๊วตออร์แกนิกแอลมอนด์ดีเจเทเลกราฟ ออร์แกนิคครูเสดผิดพลาดสะบึม",
      "รัตนาธิเบศร์กัณณาฑ ไคฟง จิ๊กซอว์ราชคฤห์เมน",
    ],
  },
  {
    id: 3,
    title:
      "ไทเฮา เปียโนซีรีส์นู้ดอัลมอนด์สเตชั่น เพนกวินแจ๊กเก็ตไคลแม็กซ์กลาสอุปนายิกา ?",
    answers: [
      "กราวนด์ไฟลท์ไฟต์ครูเสดเอนทรานซ์.",
      "โปสเตอร์อ่วมโอเพ่นอึ๋ม สะเด่าไตรมาสมายาคติบอร์ด ทอล์คสต็อกโดมิโนช็อปเปอร์",
      "ซิตี้สลัมเมคอัพเกจิรีสอร์ท ติงต๊องเห่ยพริตตี้โอเวอร์คอนเซ็ปต์ ว้าวห่วยคอลเล็กชั่นคองเกรสเซนเซอร์",
      "โปรเตสแตนท์เยภุยยสิกาพระตะบองกูเตนเบิร์กเราเตอร์ เสลภูมิกบฎฮาราเร โคตรบองเนชั่นแนลแซ่ด",
    ],
  },
  {
    id: 4,
    title:
      "คาร์โก้ตรวจทานทีวีผิดพลาดเท็กซ์ ฮาร์ดสแตนเลสสไตรค์มายองเนส แอโรบิคโง่เขลาจิ๊กซอว์ฮวงจุ้ย ?",
    answers: [
      "เบอร์เกอร์ ไอซ์อพาร์ตเมนท์ภคันทลาพาธเบนโตะ.",
      "ซังเตเชอร์รี่ตังค์สกรัม บรา เพนกวินเชอร์รี่",
      "ศึกษาศาสตร์ดยุค รีทัชแซ็กทาวน์พลานุภาพ ออเดอร์ราชานุญาตแอปพริคอทกิฟท์",
      "สดายุยะลาหยอมแหยมบางระจันมงฟอร์ต นนทบุรีเคลือบแฝงอะดรีนาลีน ชุนชิวดอสเดชานุภาพทรมาณวิทยายน",
    ],
  },
  {
    id: 5,
    title:
      "แทงโก้สเต็ปลิมิตกาญจนาภิเษกเจ๊ ทัวริสต์ เมจิกแม็กกาซีนธุหร่ำสป็อตเต๊ะ ?",
    answers: [
      "เวิร์ลด์ผลักดันสโตร์อัตลักษณ์เมจิก แฟร์โก๊ะสปอร์ต ภารตะที่มั่น ไอริช.",
      "แมนชั่นชิฟฟอนสปิริตกัมมันตะต่อรอง ไวกิ้งโพลารอยด์ สเตอริโอ",
      "โบรกเกอร์แซว ซาร์ดีนเรซินตุ๊กตุ๊กโหลน คันธาระเคลียร์ไนน์",
      "ปั่นป่วนธาลัสซีเมียเชฟโรเลต ลำพูนเย็นใจฟิชชันอาณานิคม เคอร์เนลวินโดวส์สมุทรสงคราม",
    ],
  },
  {
    id: 6,
    title: "ออยล์เอ๋อแบรนด์ แจ๊กเก็ตเซอร์ไพรส์ ยนตรกรรมเฝอมิวสิคขั้นตอน ?",
    answers: [
      "ซัพพลายเออร์แอปพริคอทเคลียร์ป๊อป.",
      "ภควัทคีตา ช็อคคลิปแมนชั่นคัตเอาต์ แกสโซฮอล์ช็อตคอร์ส",
      "ลาตินน้องใหม่มายาคติแซมบ้า พรีเมียร์อิเลียดฮัลโลวีนกรรมาชนน็อก มินต์",
      "สูญญากาศสเปกโทรสโคปนครพนมเวสิเคิลไฮโดรลิก ปิยมิตรเพอร์ออกไซด์จิ๋ม นิโคลัส",
    ],
  },
  {
    id: 7,
    title: "ทัวริสต์ ริคเตอร์แคมปัสบลอนด์พาสตา โมจิ ?",
    answers: [
      "ฮวงจุ้ยบ็อกซ์ชัตเตอร์รีเสิร์ชพฤหัส เนอะดีเจแก๊สโซฮอล์บริกร.",
      "ราชบัณฑิตยสถานเอ๋อแลนด์ภูมิทัศน์ แทงกั๊ก แรลลี่วอฟเฟิล",
      "ภควัมบดีเฟอร์รี่ อีโรติก เดโมเซรามิกซิมโฟนีโปรดักชั่นเมเปิล",
      "เครื่องแบบยอดเยี่ยม กองทัพทรุดโทรมสดกก๊อกธม คาวบอยพนิชมิถุนายน",
    ],
  },
  {
    id: 8,
    title: "ราชานุญาตอาร์พีจีตุ๊ดแบตอึ๋ม สเปกดีไซน์เนอร์ ล็อตควิกคอรัปชั่น ?",
    answers: [
      "มาร์กอิ่มแปร้โคโยตี้อิเหนาพันธกิจ ไดเอ็ตพุทโธ.",
      "ดีพาร์ตเมนต์ไลน์ สุนทรีย์ไอซ์เพียบแปร้ชาร์จติวเตอร์ ท็อปบู๊ทโจ๋",
      "ไนท์บึมออร์แกนิกกราวนด์ รีไทร์ แม่ค้ายูวีม้าหินอ่อน",
      "เอกชนไนท์ ร้อยเอ็ดแอปพลิเคชั่นนพเก้า อพาร์ตเมนท์ยูนิเซฟดิจิตอลโทรจัน",
    ],
  },
  {
    id: 9,
    title: "บาบูนแคร์ยิม เวิลด์ม้ง คอร์รัปชั่นสตีลอันตรกิริยา ?",
    answers: [
      "แพตเทิร์นซูเปอร์ไลน์แหม็บ โก๊ะสัมนาฟอยล์โปรโมชั่นชินบัญชร.",
      "นอร์ทสติกเกอร์เลสเบี้ยน เปราะบาง เฟรชริกเตอร์คอมพ์",
      "ชิฟฟอน เฝอ ซื่อบื้อยาวีนางแบบซีนสตีล",
      "กัวลาลัมเปอร์นิโคลัสบริติชโครมาโทกราฟี เอสเตอร์ ไซ่ง่อน",
    ],
  },
  {
    id: 10,
    title:
      "อพาร์ตเมนต์ซูมสแตนดาร์ดริกเตอร์ ตุ๊ดโก๊ะแยมโรลโฟน กุมภาพันธ์เรตว้อดก้าว้อย ?",
    answers: [
      "สึนามิ มาร์ชแจ๊กพอต.",
      "บึมช็อปเปอร์เซ็กส์ปอดแหก ยิว สัมนา",
      "เซฟตี้ไนน์ซานตาคลอสอาร์ติสต์ออทิสติก ออเดอร์เพลย์บอยบอดี้ศากยบุตร ออร์แกน",
      "ดานังเอาต์พุท ฟลูออไรด์บิดเบี้ยวราชบุรี พะโค",
    ],
  },
  {
    id: 11,
    title: "แตงกวาโบว์วีไอพี ฮาราคีรีทอล์คพีเรียดฟอร์ม แฟรนไชส์บูติค ?",
    answers: [
      "วิดีโอ แฟกซ์ดราม่าเพนตากอนแอร์ไฮเวย์ แหววเวอร์ผลักดันรูบิค.",
      "พรีเซ็นเตอร์แอโรบิคบ๋อยสปา ตะหงิดซาดิสต์โฟน แชมเปญวิลเลจฟอยล์เรซินรุมบ้า",
      "ฟรานซิส เอทิลีนอังรีดูนังต์หนองบัวลำภูบารัก ฟรานซิสราชบุรี",
      "ฮีบรู หยอมแหยมเซลติกอะซีติกซัมซุงฟลูออเรสเซนซ์ เอเวอเรสต์อีโบล่าฮามาสไอซี",
    ],
  },
  {
    id: 12,
    title:
      "โฮป กุนซือนอร์ท ก๊วนซิมโฟนี่โนติสฟลุค แอปพริคอท เยอร์บีราซะโพสต์โปร ฟยอร์ดวิกยอมรับเวสต์ ศิลปากรชัตเตอร์ ศากยบุตร อะโฮลวีต ?",
    answers: [
      "ดาวน์ แคร็กเกอร์มิลค์ปัจเจกชน สไตล์ฟยอร์ดงี้ซินโดรมคอมเมนท์.",
      "โจ๋ซามูไร ไฮไลต์อพาร์ตเมนท์เบนโลควีน ซิ่งแบรนด์ฮาร์ดซิ่งจังโก้",
      "ลันตาแอตแลนติสไฮเพอร์โบลาฮิรางานะ ปัญจาบดอนเมืองยูเครนไนเม็กซ์อีโบล่า ปีเตอร์รัฐประศาสน์",
      "นวลลออซิงค์ ซูลู เห้งเจียฮอปกินส์",
    ],
  },
  {
    id: 13,
    title: "Praesent facilisis enim a elit porta sodales ?",
    answers: [
      "Vestibulum non enim et est blandit commodo sed blandit mauris.",
      "Nulla quis ipsum ac tortor dignissim fermentum",
      "Curabitur sed metus a leo egestas sagittis",
      "Cras ut elit malesuada, congue tellus eget, pretium lorem",
    ],
  },
  {
    id: 14,
    title:
      "Maecenas eu tellus vitae mauris tempus gravida vitae laoreet nisl ?",
    answers: [
      "Pellentesque quis leo at ante gravida efficitur sed eget ex.",
      "Fusce viverra leo a nisl lacinia finibus",
      "Phasellus id justo eu tellus porttitor placerat",
      "Donec ut augue nec ipsum gravida luctus",
    ],
  },
  {
    id: 15,
    title: "Suspendisse vitae nisl at libero sodales efficitur et nec felis ?",
    answers: [
      "Vestibulum nec diam at ex vestibulum porttitor eleifend vel sapien.",
      "Proin ornare mauris id leo facilisis, nec vulputate augue iaculis",
      "Nullam vitae sem imperdiet ante posuere sagittis",
      "Phasellus auctor neque quis ex varius convallis",
    ],
  },
  {
    id: 16,
    title: "Suspendisse quis ligula at risus convallis ultrices a et leo ?",
    answers: [
      "Aenean lobortis odio eget efficitur rutrum.",
      "Ut feugiat nisi eget cursus accumsan",
      "Curabitur congue nisi ac urna auctor venenatis",
      "Vivamus consequat justo id luctus euismod",
    ],
  },
  {
    id: 17,
    title: "Curabitur ultricies nibh non maximus dignissim ?",
    answers: [
      "Morbi ultrices purus sit amet augue luctus sagittis.",
      "Cras placerat quam id sapien maximus vestibulum",
      "Sed sit amet elit in ante convallis aliquet",
      "Vivamus auctor arcu nec erat malesuada vestibulum",
    ],
  },
  {
    id: 18,
    title: "Integer egestas tellus ut lorem vulputate suscipit ?",
    answers: [
      "Nunc sodales lacus sed ipsum cursus aliquet.",
      "Vestibulum rhoncus ligula eu mollis ultricies",
      "Suspendisse consectetur dolor in blandit fringilla",
      "Mauris nec mauris eu nibh imperdiet fermentum vel sed odio",
    ],
  },
  {
    id: 19,
    title: "Maecenas nec nulla eget massa placerat vehicula ?",
    answers: [
      "In in erat vitae tellus consectetur eleifend.",
      "Donec at orci elementum, pretium elit vel, convallis ligula",
      "In eu nulla interdum, aliquam ipsum at, elementum odio",
      "Curabitur tristique leo vel nisi rhoncus tincidunt",
    ],
  },
  {
    id: 20,
    title: "Quisque at nulla sit amet urna sodales dapibus ?",
    answers: [
      "Praesent vulputate libero et nisi ultricies viverra.",
      "Donec lacinia enim vel vulputate tempus",
      "Donec eu ante nec arcu pulvinar tristique",
      "Sed id justo eget tellus maximus consequat in sit amet quam",
    ],
  },
];
