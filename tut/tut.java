public class tut{
    public static void before()
    {
        System.out.println("before");
    }
    static public void after(){
        System.out.println("after");
    }
    static  void   afteer(){
        System.out.println("after");
    }
    public static void main(String args[])
    {
        System.out.println(10+20+"subscribe");
        
        System.out.println("subscribe"+10+20);
        
        System.out.println(10*20+"channel");
        
        System.out.println("channel"+10*20);
        after();
        before();
        afteer();
    }
}