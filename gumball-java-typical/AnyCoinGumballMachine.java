public class AnyCoinGumballMachine extends TwoQuarterGumballMachine {
    public AnyCoinGumballMachine(int size) {
        super(size);
    }

    public void insertAnyCoin(int coin) {
        if (coin <=0 || coin >25) {
            System.out.println("This machine only accept COINS. No cash. No stone. Need 50 cents to play");
            return;
        }
        deposit += coin;
        if (deposit == 50) {
            this.has_money = true;
            System.out.printf("***Turn crank to play.***\n", this.deposit);
        } else if (deposit > 50){
            System.out.printf("Cannot deposit > 50 cents. Changes of %d cents are returned.\n", this.deposit-50);
            this.deposit = 50;
            this.has_money = true;
        } else {
            System.out.format("You've deposited %d cents. Need 50 cents to play.\n", this.deposit);
            this.has_money = false;
        }
    }

    public void returnRemainingBalance(){
        System.out.printf("All remaining balance %d cents returned.\n", this.deposit);
        this.deposit = 0;
        System.out.printf("Current balance: %d.\n", this.deposit);
    }

    @Override
    public void turnCrank() {
        if(this.has_money == true) {
            this.deposit =0;
        }
        super.turnCrank();
    }
}
