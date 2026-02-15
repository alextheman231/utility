import { normaliseIndents } from "src/root/functions/taggedTemplate";

/**
 * Returns a string representing the lyrics to the package's theme song, Commit To You
 *
 * [Pls listen!](https://www.youtube.com/watch?v=mH-Sg-8EnxM)
 *
 * @returns The lyrics string in markdown format.
 */
function sayHello(): string {
  return normaliseIndents`
    # Commit To You

    ### Verse 1

    I know you've been checking me out,  
    Shall we take it to the next level now?  
    'Cause I really wanna be there all for you,  
    All for you!  
    Come on now, let's make a fresh start!  
    Pin my number, then you can take me out!  
    Can't you see I really do care about you,  
    About you!

    ### Pre-chorus 1
    Although our calendars are imperfect, at best,  
    I'd like to organise time with you! (with you!).  
    Just tell me when and I'll make it clear,  
    All clear for you,  
    All clear for you!  
    (One, two, three, go!)

    ### Chorus
    I wanna be of utility, I'll help you on the run!  
    I'll be the one here in the back, while you go have some fun!  
    Looking out for you tonight, I'll be the one you can rely on!  
    Watch you go and watch me pass by,  
    I'll be here!  
    I'll commit to you!

    ### Verse 2
    Though sometimes it won't be easy,  
    You'll be here to bring out the best in me,  
    And I'll hold myself to high standards for you!  
    All for you!  
    We'll grow as a pair, you and me,  
    We'll build up a healthy dependency,  
    You can build with me and I'll develop with you!  
    I'm with you!

    ### Pre-chorus 2
    I'll be with you when you're up or you're down,  
    We'll deal with all our problems together (together!)  
    Just tell me what you want, I'll make it clear,  
    All clear for you,  
    All clear for you!  
    (One, three, one, go!)

    ### Chorus
    I wanna be of utility, I'll help you on the run!  
    (help you on the run!)  
    I'll be the one here in the back, while you go have some fun!  
    (you go have some fun!)  
    Looking out for you tonight, I'll be the one you can rely on!  
    Watch you go and watch me pass by,  
    I'll be here!  
    I'll commit to you!

    ### Bridge
    Looking into our stack!  
    I'll commit to you!  
    We've got a lot to unpack!  
    I'll commit to you!  
    The environment that we're in!  
    I'll commit to you!  
    Delicate as a string!  
    I'll commit to you!

    But I think you're my type!  
    I'll commit to you!  
    Oh, this feels all so right!  
    I'll commit to you!  
    Nothing stopping us now!  
    I'll commit to you!  
    Let's show them what we're about!  
    Two, three, four, go!

    ### Final Chorus
    I wanna be of utility, I'll help you on the run!  
    (help you on the run!)  
    I'll be the one here in the back, while you go have some fun!  
    (you go have some fun!)  
    Looking out for you tonight, I'll be the one you can rely on!  
    Watch you go and watch me pass by,  
    I'll be here!  
    I'll commit to you!

    I wanna be of utility, I'll help you on the run!  
    (I'll commit to you!)  
    I'll be the one here in the back, while you go have some fun!  
    (I'll commit to you!)  
    Looking out for you tonight, I'll be the one you can rely on!  
    (I'll commit to you!)  
    Watch you go and watch me pass by,  
    (I'll commit to you!)  
    I'll be here!  

    ### Outro
    I'll commit to you!  
    I'll commit to you!  
    I'll commit to you!
    `;
}

export default sayHello;
