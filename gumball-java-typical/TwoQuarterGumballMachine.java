class TwoQuarterGumballMachine extends GumballMachine {
    int deposit = 0;

    public TwoQuarterGumballMachine(int size) {
        super(size);
    }


    @Override
    public void insertQuarter(int coin) {
        if (coin != 25) {
            System.out.println("This machine only accept quarters. Need 2 quarters to play");
            return;
        }
        deposit += 25;
        if (deposit == 50) {
            this.has_money = true;
        } else if(deposit > 50){
            System.out.println("No slot for >2 quarters. Your quarter is returned.\n");
            this.deposit = 50;
            this.has_money = true;
        } else {
            this.has_money = false;
        }
    }

    @Override
    public void turnCrank() {
        if(this.has_money == true) {
            this.deposit = 0;
        }
        super.turnCrank();
    }
}
