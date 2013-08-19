/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
  this.name = (name) ? 'Корабль "' + name +'".' : 'Грузовой корабль.';
  this.position = position;
  this.capacity = capacity;
  this.cargo = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
  console.log(this.name + ' Местоположение: ' + this.position[0] + ',' + this.position[1]
	+ '. Занято: ' + this.getOccupiedSpace + ' из ' + this.capacity + 'т');
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
  return this.capacity - this.cargo;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
  return this.cargo;
}

/**
* Загружает корабль.
* @name Vessel.loadCargo
* @param {Number} cargoWeight Колиество загружаемого груза
* @return {Number} количество загруженного груза
*/
Vessel.prototype.loadCargo = function(cargoWeight) {
  cargoWeight = (cargoWeight <= this.cargo) ? cargoWeight : this.capacity - this.cargo;
  this.cargo += cargoWeight;
  return cargoWeight;
}
/**
* Разгружает корабль.
* @name Vessel.unloadCargo
* @param {Number} cargoWeight Количество выгружаемого груза
* @return {Number} Количество выгруженного груза
*/
Vessel.prototype.unloadCargo = function(cargoWeight) {
  cargoWeight = (cargoWeight <= this.cargo) ? cargoWeight : this.cargo;
  this.cargo -= cargoWeight;
  return cargoWeight;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
  this.position = (newPosition.constructor.name == 'Planet' ? newPosition.position : newPosition);
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
  this.name = name || "Неизвестная планета";
  this.position = position;
  this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
  console.log( 'Планета "' + this.name +'". Местоположение: ' + this.position[0] + ',' + this.position[1] + '. '
	+ (this.availableAmountOfCargo != 0 ? 'Доступно груза: ' + this.availableAmountOfCargo : 'Грузов нет.')
  );
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
  return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
  if (vessel.position == this.position) {
     (this.availableAmountOfCargo >= cargoWeight)
	? this.availableAmountOfCargo -= vessel.loadCargo(cargoWeight)
	: this.availableAmountOfCargo -= vessel.loadCargo(this.availableAmountOfCargo);
  }
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
  if (vessel.position == this.position) {
    this.availableAmountOfCargo += vessel.unloadCargo(cargoWeight);
  }
}



var vessel = new Vessel('Yandex', [0,0], 1000);

var planetA = new Planet('A', [0,0], 0);
var planetB = new Planet('B', [100,100], 5000);
var planetC = new Planet('C', [200,200], 300);

vessel.report();
planetA.report();
planetB.report();
planetC.report();

console.log('\nfly to planet B');
vessel.flyTo(planetB);
planetB.loadCargoTo(vessel, 1000);
vessel.report();
planetB.report();

console.log('\nfly to planet A');
vessel.flyTo(planetA);
planetA.unloadCargoFrom(vessel, 500);
vessel.report();
planetA.report();

console.log('\nfly to planet C');
vessel.flyTo(planetC);
planetC.loadCargoTo(vessel, 500);
vessel.report();
planetC.report();