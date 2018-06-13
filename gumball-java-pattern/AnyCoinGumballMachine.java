public class AnyCoinGumballMachine extends TwoQuarterGumballMachine {

    public AnyCoinGumballMachine(int numberGumballs, int amountToPlay, String coinType) {
        super(numberGumballs, amountToPlay, coinType);
    }

    public void insertCoin(Coin coin) {
        switch (coin){
            case PENNY: this.coinType ="penny";
            break;
            case NICKEL: this.coinType ="nickel";
            break;
            case DIME: this.coinType ="dime";
            break;
            case QUARTER: this.coinType ="quarter";
            break;
            default: break;
        }
        super.insertQuarter();
    }


    public void ejectCoin() {
        super.ejectQuarter();
    }


}
