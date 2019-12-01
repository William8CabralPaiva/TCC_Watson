using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweetinvi;

namespace teste_natural.src
{
    class Twitter
    {
        public static void Credenciais()
        {
            Auth.SetUserCredentials(Constantes.API_KEY, Constantes.TOKEN_SECRET, Constantes.ACCESS_TOKEN, Constantes.TOKEN_SECRET);
        }

        public static List<String> Twetts(String usuario)
        {
           

            //var matchingTweets = Search.SearchTweets("tweetinvi");
            //Console.WriteLine(matchingTweets);
            //var user = User.GetAuthenticatedUser();
            var user = User.GetUserFromScreenName(usuario);
            //MessageBox.Show(user.ToJson());
            //var tweet = Tweet.PublishTweet("agua com gás é ruim");
            try
            {
                if (user != null)
                {
                    var timeline = Timeline.GetUserTimeline(user, 10);
                    List<String> tweets = new List<String>();

                    foreach (var publi in timeline)
                    {
                        tweets.Add(publi.FullText);
                    }

                    tweets.RemoveAll(string.IsNullOrWhiteSpace);
                    return tweets;
                }
            }
            catch (Exception)
            {
                return null;
            }
            return null;
        }
    }
}
