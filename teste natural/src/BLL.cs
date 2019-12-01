using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace teste_natural
{
    class BLL
    {
        public static Boolean valida(ref List<String> frases)
        {
            if (frases != null && frases.Count() > 0 && frases[0] != "")
            {
                frases.RemoveAll(string.IsNullOrWhiteSpace);
                return true;
            }
            return false;
        }
        public static Boolean validaEntrada(String usuario)
        {
            if (usuario!="" && usuario != " ")
            {
                return true;
            }
            return false;
        }

    }
}