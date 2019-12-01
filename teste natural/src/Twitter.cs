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
            Auth.SetUserCredentials("I35xeFFub3CBir0m1TJ7gJPGj", "iqfCO3hiCn62v7MMzQQERV9dYu3DHiWFKW7rm6uAcz9KCD8roN", "3331933054-rEkguuDn1XXZlwlfhqCYdm3abM6buMuIHCN90yg", "I6CcFJ8TpNma8uoEO0juj9FXU2J7s5AAYiOoSNGxrCsFp");
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
