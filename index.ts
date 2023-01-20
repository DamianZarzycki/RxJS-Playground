import './style.css';

import {
  of,
  map,
  Observable,
  merge,
  forkJoin,
  mergeMap,
  switchMap,
  reduce,
  range,
  expand,
  from,
  race,
  fromEvent,
  debounce,
  interval,
  skip,
  concat,
  Subject,
  BehaviorSubject,
  zip,
  timeout,
  ReplaySubject,
} from 'rxjs';
import { delay, take } from 'rxjs/operators';

const observable$ = new Observable((obs) => {
  obs.next('Damian'),
    obs.next('Denver'),
    obs.error('HEHHEHEHE'),
    obs.complete();
});
const log = console.log;
const nestedObs$ = new Observable((obs) => {
  try {
    obs.next(of(11, 22, 33, 44).pipe(delay(2000))),
      obs.next(of(55, 66, 77, 88).pipe(delay(1000))),
      obs.next(of(99, 100, 111, 122).pipe(delay(1000)));
  } catch {
    obs.error('sheeeesh');
  }
  obs.complete();
});

const number$ = of(1, 2, 3, 4, 5, 6, 7);

observable$.pipe().subscribe((res) => {
  // console.log(res);
});

const coupleOfObsr$ = forkJoin([number$, observable$, nestedObs$]);

// coupleOfObsr$.subscribe((res) => console.log(res));
// nestedObs$.pipe(mergeMap(el => el)).subscribe(console.log);
// nestedObs$.pipe(switchMap((el) => el)).subscribe(console.log);
// nestedObs$.pipe(mergeMap((el) => el)).subscribe(console.log);

const range$ = range(10);

// Reduce
// range$
//   // .pipe(reduce((acc, el) => acc * el, 1))
//   .subscribe((res) => console.log(res));

const a = {
  d: 'd',
  g: {
    c: 'sd',
  },
};

const b = Object.assign(a, {});
const c = JSON.parse(JSON.stringify(a));
b.g.c = 'ds';
// concat | forkJoin | merge | race

concat(of(1, 2, 3, 4, 5, 6), of(11, 22, 33, 44, 55, 66)).subscribe((res) =>
  console.log(res, 'concat')
);

const btn = document.getElementById('btn');

const btn_clicks = fromEvent(btn, 'click');

btn_clicks.pipe(
  debounce(() => interval(500)),
  skip(2)
);

setTimeout(() => {
  const conct = concat(
    btn_clicks.pipe(
      debounce(() => interval(500))
      // skip(2)
    ),
    of(1, 2, 3, 4, 5, 6)
  ).subscribe((res) => console.log(res, 'concat 🎄'));
  const concat2 = new BehaviorSubject(concat);
  log(concat2.getValue(), '☡');
});

from([of(2), of(3), of(4), of(5)]).pipe(
  mergeMap((x) => x),
  take(5)
);
// .subscribe(log);

merge(of(2), of(3), of(4), of(45), from([of(2), of(3), of(4), of(5)]))
  .pipe(mergeMap(async (res) => res))
  .subscribe((res) => console.log(res, 'merge'));

forkJoin([of(2), of(3), of(4)]).subscribe((res1) => {
  log(res1, 'forkJoin()');
});
log('$$$$$$$$$$$$');

// mirror clone of first emitted OBSERVABLE
race([of(1, 3, 4, 5), of(9, 8, 7, 6, 5)]).subscribe((res) =>
  console.log(res, 'race')
);

// range$.pipe(expand((x) => of(x * 2))).subscribe(log);

const arr = [1, 2, 3, 4, 5].map((el) => el + 1);
console.log(arr, 'arr');

for (const a in [1, 2, 3, 4, 5]) {
  log(a, 'aa');
}

const observable1 = from([1, 2, 3]);
const observable2 = of(4, 5, 6);

const zippedObservable = zip(observable1, observable2);

zippedObservable
  // .pipe(mergeMap((el) => el))
  .subscribe((val) => console.log(val, 'zip'));

const replySubject = new ReplaySubject();

replySubject.next(1);

replySubject.subscribe((res) => log(res, 'ReplySubject'));
replySubject.next(2);
replySubject.next(3);
replySubject.subscribe((res) => log(res, 'ReplySubject 2'));
replySubject.next(4);
replySubject.next(5);

const subject = new Subject();

subject.next(1);

subject.subscribe((res) => log(res, 'Subject'));
subject.next(2);
subject.next(3);
subject.subscribe((res) => log(res, 'Subject 2'));
subject.next(4);
subject.next(5);

abstract class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  display(): void {
    console.log(this.name);
  }

  abstract find(string): Person;
}

class Employee extends Person {
  empCode: number;

  constructor(name: string, code: number) {
    super(name); // must call super()
    this.empCode = code;
  }

  find(name: string): Person {
    // execute AJAX request to find an employee from a db
    return new Employee(name, 1);
  }
}

let emp: Person = new Employee('James', 100);
emp.display(); //James

let emp2: Person = emp.find('Steve');

interface Example {
  s: string;
}

const example: Example = { s: 'sdsd' };

log(typeof example, 'typeof');
log(example instanceof String, 'instanceof');

abstract class A {
  z: string = 'dssd';
  abstract aZ: string;
  abstract screemAbstract();
  screemNoneAbstract() {
    log('abstract metod', 'LOL');
  }
}

class B extends A {
  // z: string;
  aZ: string;
  lol: string;
  constructor() {
    super();
    this.aZ = 'TRALALAL';
    // this.z = 'W';
    this.lol = super.z;
  }

  screemAbstract() {
    log(this.lol, 'From B class');
    super.screemNoneAbstract();
  }
}
foooo();

function foooo() {
  log('TTTTTT');
}
const bigB = new B();

bigB.screemAbstract();
bigB.screemNoneAbstract();
log(bigB.z, 'z');
log(bigB.aZ, 'aZ');
log(bigB.lol, 'LOL');
