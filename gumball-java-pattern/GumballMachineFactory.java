public class GumballMachineFactory {

    public static GumballMachine getGumballMachine(int numberGumballs, int amountToPlay, Coin coinType) {
        if (coinType.toString().equals("QUARTER") && amountToPlay == 25 ){
            return new GumballMachine(numberGumballs, coinType.toString().toLowerCase());
        } else if (coinType.toString().equals("QUARTER") && amountToPlay ==50 ){
            return new TwoQuarterGumballMachine(numberGumballs, amountToPlay, coinType.toString().toLowerCase());
        } else if (!coinType.toString().equals("QUARTER") && amountToPlay ==50 ) {
            return new AnyCoinGumballMachine(numberGumballs, amountToPlay, "coin");
        } else {
            throw new Error("Do not have this kind of gumball machine!");
        }
    }
}
