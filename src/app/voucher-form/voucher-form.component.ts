import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { BaseFormComponent } from '../sharing/base-form/base-form.component';
import { Validators } from '@angular/forms';
import { Voucher } from '../interface/voucher';
import { DatePipe } from '@angular/common';
import { Ledger } from '../interface/ledger';
import { SqlRequest } from '../interface/sql-request';
import { AuthService } from '../services/auth.service';
import { Message } from '../interface/message';

@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.css'],
  providers: [DatePipe]
})
export class VoucherFormComponent extends BaseFormComponent implements OnInit {
  @Output() hideEvent = new EventEmitter<number>();
  ledgers: Array<Ledger> = [];

  constructor(
    injector: Injector,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {
    super(injector);
    this.myForm = this.fb.group({
      id: [0, [Validators.min(0)]],
      posted_on: [
        this.currentDate,
        [Validators.pattern('^[0-9]{4}(-[0-9]{2}){2} [0-9]{2}(:[0-9]{2}){2}$')]
      ],
      creditor_id: [0, [Validators.required, Validators.min(1)]],
      debtor_id: [0, [Validators.required, Validators.min(1)]],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      narration: ''
    });
  }

  ngOnInit() {
    this.sq
      .select('ledger', { columns: ['id', 'title'] })
      .subscribe((res: Array<Ledger>) => (this.ledgers = res));
  }

  onIdChange() {
    this.sq
      .select('vouchers', { andWhere: { id: this.id } })
      .subscribe((res: Array<Voucher>) => {
        if (res.length === 1) {
          const voucher = res[0];
          this.creditor_id = voucher.creditor_id;
          this.debtor_id = voucher.debtor_id;
          this.amount = voucher.amount;
          this.narration = voucher.narration;
          this.posted_on = voucher.posted_on;
        } else {
          this.onReset();
        }
      });
  }

  onClose = () => this.hideEvent.emit(0);

  onSubmit() {
    if (this.creditor_id === this.debtor_id) {
      this.ns.changeMessage({
        title: 'Invalid Form Data',
        content: 'Creditor and Debtor cannot be Same. Please Make correction'
      });
      return;
    }

    if (this.authService.isAuth(1) ) {
      const request: SqlRequest = {
        userData: {
          creditor_id: this.creditor_id,
          debtor_id: this.debtor_id,
          amount: this.amount,
          narration: this.narration,
          user_id: this.authService.activeUser.id,
          posted_on: this.posted_on
        }
      };
      console.log(request);
      if (this.id > 0) {
        const message: Message = {
          id: this.id,
          title: 'Updated Successfuly',
          content: `Cashbook has been updated with Following Details`,
          additionalInfo: [
            `Posted on - ${this.posted_on}`,
            `Giver - ${this.ledgerName(this.creditor_id)}`,
            `Receiver - ${this.ledgerName(this.debtor_id)}`,
            `Amount - ${this.amount}`
          ]
        };
        this.update('vouchers', request, message);
      } else {
        delete request.userData.posted_on;
        const message: Message = {
          id: this.id,
          title: 'Insert Successfuly',
          content: `Cashbook has been updated with Following Details`,
          additionalInfo: [
            `Giver - ${this.ledgerName(this.creditor_id)}`,
            `Receiver - ${this.ledgerName(this.debtor_id)}`,
            `Amount - ${this.amount}`
          ]
        };
        this.insert('vouchers', request, message);
      }
    } else {
      this.ns.changeMessage({
        title: 'Unauthorised',
        content: 'You are not authorised to submit Data. Please Log In'
      });
      this.onReset();
    }
  }

  private ledgerName(theId: number): string {
    return this.ledgers.find((x: Ledger) => +x.id === +theId).title;
  }

  /**
   * Getters and Setters
   */

  get creditor_id(): number {
    return +this.myForm.get('creditor_id').value;
  }

  set creditor_id(creditor: number) {
    this.myForm.get('creditor_id').setValue(creditor);
  }

  get debtor_id(): number {
    return +this.myForm.get('debtor_id').value;
  }

  set debtor_id(debtor: number) {
    this.myForm.get('debtor_id').setValue(debtor);
  }

  get amount(): number {
    return +this.myForm.get('amount').value;
  }

  set amount(amo: number) {
    this.myForm.get('amount').setValue(amo);
  }

  get narration(): string {
    return this.myForm.get('narration').value;
  }

  set narration(narration: string) {
    this.myForm.get('narration').setValue(narration);
  }

  get posted_on(): string {
    return this.myForm.get('posted_on').value;
  }

  set posted_on(postedOn: string) {
    this.myForm.get('posted_on').setValue(postedOn);
  }

  get currentDate(): string {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
}
