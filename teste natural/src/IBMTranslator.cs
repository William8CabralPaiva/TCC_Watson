using IBM.Cloud.SDK.Core.Authentication.Iam;
using IBM.Watson.LanguageTranslator.v3;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace teste_natural
{
    public class IBMTranslator
    {
       public static List<String> Tradutor(List<String> frases)
        {
            IamConfig config = new IamConfig(
                apikey: "splr6RfbtDSHd4_Ebc1QtVlFXMdNs-kZA5kqMxCK2xH5"
            );

            LanguageTranslatorService service = new LanguageTranslatorService("2018-05-01", config);
            service.SetEndpoint("https://gateway.watsonplatform.net/language-translator/api");

            var result = service.Translate(
                text: frases,
                modelId: "pt-en"
            );

            Console.WriteLine(result.Response);
            JObject json = JObject.Parse(result.Response);
            var jsonFilho = json["translations"];

            List<String> traduzido = new List<String>();
            for (int i = 0; i < jsonFilho.Count(); i++)
            {
                // MessageBox.Show(jsonFilho[i]["translation"].ToString());
                traduzido.Add(jsonFilho[i]["translation"].ToString());
            }
            return traduzido;


        }
    }
}
