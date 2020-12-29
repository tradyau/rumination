const headPet = {
  // 宠物总店提供了最基础的出售，回购宠物的服务
  sellPet: (name) => {
    // 出售宠物
    console.log('出售一只宠物', name);
  },
  name: 'shop',
};
const subPet = new Proxy(headPet, {
  get(target, key) {
    if (key === 'sellPet') {
      return {
        sell(name) {
          // 出售宠物
          headPet.sellPet(name);
        },
        sellPetFood(name) {
          // 购买宠物食物送宠物活动
          console.log('搭配了一大波食粮');
          headPet.sellPet(name);
        },
        sellPetCage(name) {
          // 购买宠物笼子送宠物活动
          console.log('搭配一个大笼子');
          headPet.sellPet(name);
        },
      };
    } else {
      return target[key];
    }
  },
});
subPet.sellPet.sellPetFood('tom');
console.log(subPet.name);


