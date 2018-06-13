public class TwoQuarterGumballMachine extends GumballMachine{
    int deposit;
    int amountToPlay;

    public TwoQuarterGumballMachine(int numberGumballs, int amountToPlay, String coinType) {
        super(numberGumballs, coinType);
        this.deposit = 0;
        this.amountToPlay = amountToPlay;
    }

    @Override
    public void insertQuarter() {
        if (this.coinType.equals("coinType")) {
            this.deposit += 25;
        } else{
            switch (this.coinType){
                case "penny": this.deposit +=1;
                    break;
                case "nickel": this.deposit +=5;
                    break;
                case "dime": this.deposit +=10;
                    break;
                case "quarter": this.deposit +=25;
                    break;
                default: break;
            }
        }
        if(this.deposit < this.amountToPlay) {
            super.insertQuarter();
            this.state = noQuarterState;
        } else if (this.deposit >= this.amountToPlay){
            super.insertQuarter();
            this.state = hasQuarterState;
            this.deposit = 0;
        }
    }

    @Override
    public void ejectQuarter() {
        this.deposit = 0;
        super.ejectQuarter();
    }
}
