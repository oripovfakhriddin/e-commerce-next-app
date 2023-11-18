// const sepreateSumm = (num: number) => {
//   let money = '';
//   for(let i=0; i<num.toString().length; i++){

//   }
//   return money
// }

export const trueDate = (date: string) => {
    const berilganVaqt = new Date(date);
    const sana = berilganVaqt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return sana;
  };